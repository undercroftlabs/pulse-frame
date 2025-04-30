/**
 * @spec RFC 6455 §5.3 - Data Framing
 *
 * The 4-byte masking key is applied repeatedly for payloads longer than 4 bytes.
 */
import { unmaskPayload } from '..';

describe('unmaskPayload', () => {
  it('rfc-6455-5.3 unmasks payload by repeating 4-byte key', () => {
    const payload = Buffer.from([
      0x01 ^ 0xaa, 0x02 ^ 0xbb, 0x03 ^ 0xcc, 0x04 ^ 0xdd,
      0x05 ^ 0xaa, 0x06 ^ 0xbb // repeats
    ]);
    const key = Buffer.from([0xaa, 0xbb, 0xcc, 0xdd]);

    const unmasked = unmaskPayload(payload, key);

    const expected = Buffer.from([0x01, 0x02, 0x03, 0x04, 0x05, 0x06]);
    expect(unmasked.equals(expected)).toBe(true);
  });
});
