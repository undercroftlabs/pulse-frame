import { maskPayload } from '..';

/**
 * @spec RFC 6455 §5.3 - Data Framing
 *
 * Masking is applied by XOR-ing each byte of the payload with a repeating
 * 4-byte masking key. This test verifies correct masking behavior.
 */
describe('maskPayload', () => {
  it('rfc-6455-5.3 masks payload using repeating masking key', () => {
    const payload = Buffer.from([0x01, 0x02, 0x03, 0x04, 0x05, 0x06]);
    const maskingKey = Buffer.from([0xaa, 0xbb, 0xcc, 0xdd]);

    const result = maskPayload(payload, maskingKey);

    const expected = Buffer.from([
      0x01 ^ 0xaa,
      0x02 ^ 0xbb,
      0x03 ^ 0xcc,
      0x04 ^ 0xdd,
      0x05 ^ 0xaa,
      0x06 ^ 0xbb,
    ]);

    expect(result.equals(expected)).toBe(true);
  });
});
