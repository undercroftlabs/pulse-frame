import { unmaskPayload } from '..';

/**
 * @spec RFC 6455 §5.3 - Data Framing
 *
 * The payload data is masked by XORing it with a repeating masking key (4 bytes).
 * This test validates proper unmasking behavior for a masked payload.
 */
describe('unmaskPayload', () => {
  it('rfc-6455-5.3 unmasks payload with valid masking key', () => {
    const masked = Buffer.from([
      0x41 ^ 0xaa,
      0x42 ^ 0xbb,
      0x43 ^ 0xcc,
      0x44 ^ 0xdd,
    ]);
    const maskingKey = Buffer.from([0xaa, 0xbb, 0xcc, 0xdd]);

    const unmasked = unmaskPayload(masked, maskingKey);

    expect(unmasked.equals(Buffer.from([0x41, 0x42, 0x43, 0x44]))).toBe(true);
  });
});
