import { PulseFrame } from '@/types/pulse-frame';
import { PulseFrameHeader } from '@/types/pulse-frame-header';

/**
 * @spec Internal API - Frame Payload Handling
 *
 * Validates that `getPayloadBuffer()` returns the correct payload value.
 * - If `applicationData` exists, it is returned.
 * - Otherwise, it falls back to the raw `payloadData`.
 */
describe('PulseFrame.getPayloadBuffer', () => {
  it('returns the applicationData if it exists', () => {
    const payload = Buffer.from('test-data');
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

    expect(frame.getPayload()).toEqual(payload);
  });

  it('returns the payloadData if applicationData is undefined', () => {
    const raw = Buffer.from('raw');
    const frame = new PulseFrame(
      {
        fin: 1,
        rsv1: 0,
        rsv2: 0,
        rsv3: 0,
        mask: 0,
        opcode: 1,
        length: raw.length,
        extensionDataLength: 0,
        maskingKey: undefined,
      } as PulseFrameHeader,
      raw,
      undefined,
      undefined,
    );

    expect(frame.getPayload()).toEqual(raw);
  });
});
