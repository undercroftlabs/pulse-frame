import { PulseFrame } from '@/types/pulse-frame';
import { PulseFrameHeader } from '@/types/pulse-frame-header';
import { PulseFrameOpcode } from '@/types/pulse-frame-opcode';
import { frameToBuffer } from '..';
import { HEADER_BASE_LENGTH, EXTENDED_LENGTH_16_BYTES } from '@/types/constants';

/**
 * @spec RFC 6455 §5.2 - Base Framing Protocol
 *
 * Frames with payloads between 126 and 65535 bytes must use a 2-byte extended payload length field.
 * This test verifies that such a frame is correctly encoded.
 */
describe('frameToBuffer', () => {
  it('rfc-6455-5.2 encodes 16-bit extended payload length', () => {
    const payload = Buffer.alloc(300); // Payload >= 126 and < 65536
    const header: PulseFrameHeader = {
      fin: 1,
      rsv1: 0,
      rsv2: 0,
      rsv3: 0,
      mask: 0,
      opcode: PulseFrameOpcode.BINARY,
      length: payload.length,
      extensionDataLength: 0,
      maskingKey: undefined,
    };

    const frame = new PulseFrame(header, payload, undefined, payload);
    const buffer = frameToBuffer(frame);

    expect(buffer.length).toBe(HEADER_BASE_LENGTH + EXTENDED_LENGTH_16_BYTES + payload.length);
    expect(buffer[1] & 0x7f).toBe(126); // Indicates 16-bit extended length is used
    expect(buffer.readUInt16BE(2)).toBe(300); // Verify actual extended length bytes
  });
});
