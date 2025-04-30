import { PulseFrame } from '@/types/pulse-frame';
import { PulseFrameHeader } from '@/types/pulse-frame-header';

/**
 * @spec Internal API - Frame Payload Handling
 *
 * Verifies that `getPayloadString()` returns a UTF-8 decoded string
 * from `applicationData` if it exists, and falls back to an empty string otherwise.
 */
describe('PulseFrame.getPayloadString', () => {
  it('returns the UTF-8 string from applicationData if it exists', () => {
    const text = 'hello websocket';
    const payload = Buffer.from(text, 'utf8');

    const frame = new PulseFrame(
      {
        fin: 1,
        rsv1: 0,
        rsv2: 0,
        rsv3: 0,
        mask: 0,
        opcode: 1,
        length: payload.length,
        extensionDataLength: 0,
        maskingKey: undefined,
      } as PulseFrameHeader,
      payload,
      undefined,
      payload,
    );

    expect(frame.getPayloadString()).toBe(text);
  });

  it('returns an empty string if applicationData is undefined', () => {
    const frame = new PulseFrame(
      {
        fin: 1,
        rsv1: 0,
        rsv2: 0,
        rsv3: 0,
        mask: 0,
        opcode: 1,
        length: 0,
        extensionDataLength: 0,
        maskingKey: undefined,
      } as PulseFrameHeader,
      Buffer.alloc(0),
      undefined,
      undefined,
    );

    expect(frame.getPayloadString()).toBe('');
  });
});
