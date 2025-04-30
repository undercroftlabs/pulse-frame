import { PulseFrameOpcode } from '@/types/pulse-frame-opcode';
import { createFrame } from '..';
import { MASKING_KEY_LENGTH } from '@/types/constants';

/**
 * @spec RFC 6455 §5.1 - Data Framing and Masking
 *
 * All frames sent from the client to the server MUST be masked with a 4-byte
 * masking key. The payload is XOR-ed byte-by-byte using this key in a cyclic
 * manner.
 *
 * This test ensures that `createFrame` produces a correctly masked payload
 * when the `mask` bit is set and a masking key is provided. The test uses a
 * predictable masking key of `0x01` to validate the output byte-for-byte.
 */
describe('createFrame', () => {
  it('rfc-6455-5.1 masks payload using XOR with 4-byte masking key', () => {
    const payload = Buffer.from('abcde');
    const maskingKey = Buffer.alloc(MASKING_KEY_LENGTH, 0x01); // mask with 0x01

    const frame = createFrame({
      opcode: PulseFrameOpcode.TEXT,
      payloadData: payload,
      mask: 1,
      maskingKey,
    });

    const maskedPayload = frame.getPayload();
    expect(maskedPayload).not.toEqual(payload); // ensure it's actually masked

    for (let i = 0; i < payload.length; i++) {
      expect(maskedPayload[i]).toBe(payload[i] ^ 0x01);
    }
  });
});
