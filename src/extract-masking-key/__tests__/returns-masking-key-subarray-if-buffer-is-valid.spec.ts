import { extractMaskingKey } from "..";

/**
 * @spec RFC 6455 §5.3 - Data Framing
 *
 * When the mask bit is set, the masking key must be exactly 4 bytes.
 * This test confirms correct extraction of the key from the buffer.
 */
describe('extractMaskingKey', () => {
    it('rfc-6455-5.3 returns masking key if buffer has sufficient length', () => {
      const buffer = Buffer.from([0x01, 0x02, 0x03, 0x04, 0xAA, 0xBB]);
      const result = extractMaskingKey(buffer, 0, 4);
      expect(result.equals(Buffer.from([0x01, 0x02, 0x03, 0x04]))).toBe(true);
    });
  });