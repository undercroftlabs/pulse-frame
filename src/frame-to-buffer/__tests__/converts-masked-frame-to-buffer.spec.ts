import { MASKING_KEY_LENGTH } from '@/types/constants';
import { frameToBuffer } from '..';
import { PulseFrame } from '@/types/pulse-frame';
import { PulseFrameHeader } from '@/types/pulse-frame-header';
import { PulseFrameOpcode } from '@/types/pulse-frame-opcode';
import { unmaskPayload } from '@/unmask-payload';

/**
 * @spec RFC 6455 §5.2 - Base Framing Protocol
 *
 * Ensures that masked payloads are masked correctly in the output buffer and follow protocol layout.
 */
describe('frameToBuffer', () => {
  it('rfc-6455-5.2 converts masked frame to buffer', () => {
    const payload = Buffer.from('Hi');
    const maskingKey = Buffer.from([0xaa, 0xbb, 0xcc, 0xdd]);

    const header: PulseFrameHeader = {
      fin: 1,
      rsv1: 0,
      rsv2: 0,
      rsv3: 0,
      mask: 1,
      opcode: PulseFrameOpcode.TEXT,
      length: payload.length,
      extensionDataLength: 0,
      maskingKey,
    };

    const frame = new PulseFrame(header, payload, undefined, payload);
    const buffer = frameToBuffer(frame);

    const expectedOpcodeByte = 0x81;
    const expectedMaskByte = 0x80 | payload.length;

    expect(buffer[0]).toBe(expectedOpcodeByte);
    expect(buffer[1]).toBe(expectedMaskByte);

    const extractedKey = buffer.subarray(2, 2 + MASKING_KEY_LENGTH);
    const extractedPayload = buffer.subarray(2 + MASKING_KEY_LENGTH);

    expect(extractedKey.equals(maskingKey)).toBe(true);

    const unmasked = unmaskPayload(extractedPayload, maskingKey);
    expect(unmasked.toString()).toBe('Hi');
  });
});
