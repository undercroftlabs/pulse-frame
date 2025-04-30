import { PulseFrameOpcode } from '@/types/pulse-frame-opcode';
import { createFrame } from '..';
import { MASKING_KEY_LENGTH } from '@/types/constants';

/**
 * @spec RFC 6455 §5.1 - Data Framing and Masking
 *
 * Client-to-server frames MUST be masked using a 4-byte masking key.
 * This test verifies that the payload is correctly XOR-masked with the key,
 * and that the masking behavior follows the WebSocket protocol.
 *
 * The masking key used here is a repeated 0x01 byte, which allows predictable
 * testing of the XOR operation on each byte of the payload.
 */
describe('createFrame', () => {
  it('rfc-6455-5.1 adds masked payload', () => {
    const payload = Buffer.from('abcde');
    const maskingKey = Buffer.alloc(MASKING_KEY_LENGTH, 0x01);

    const frame = createFrame({
      opcode: PulseFrameOpcode.TEXT,
      payloadData: payload,
      mask: 1,
      maskingKey,
    });

    const maskedPayload = frame.getPayload();
    expect(maskedPayload).not.toEqual(payload);
    for (let i = 0; i < payload.length; i++) {
      expect(maskedPayload[i]).toBe(payload[i] ^ 0x01);
    }
  });
});
