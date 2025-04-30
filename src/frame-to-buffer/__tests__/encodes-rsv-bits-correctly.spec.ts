import { frameToBuffer } from '..';
import { PulseFrame } from '@/types/pulse-frame';
import { PulseFrameHeader } from '@/types/pulse-frame-header';
import { PulseFrameOpcode } from '@/types/pulse-frame-opcode';

/**
 * @spec RFC 6455 §5.2 - Base Framing Protocol
 *
 * Reserved bits RSV1, RSV2, and RSV3 must be encoded correctly when explicitly set.
 * This test verifies that `frameToBuffer` includes these bits in the first byte of the frame.
 */
describe('frameToBuffer', () => {
  it('rfc-6455-5.2 encodes RSV1, RSV2, and RSV3 bits when set', () => {
    const payload = Buffer.from('hello');

    const header: PulseFrameHeader = {
      fin: 1,
      rsv1: 1,
      rsv2: 1,
      rsv3: 1,
      mask: 0,
      opcode: PulseFrameOpcode.TEXT,
      length: payload.length,
      extensionDataLength: 0,
      maskingKey: undefined,
    };

    const frame = new PulseFrame(header, payload, undefined, payload);
    const buffer = frameToBuffer(frame);

    const firstByte = buffer[0];
    expect((firstByte & 0b01110000) >> 4).toBe(0b0111); // RSV1, RSV2, RSV3 should all be 1
  });
});
