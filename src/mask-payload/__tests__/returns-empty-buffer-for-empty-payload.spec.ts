import { maskPayload } from '..';

/**
 * @spec RFC 6455 §5.3 - Data Framing
 *
 * A zero-length payload should result in a zero-length masked output.
 * This ensures no unexpected behavior when masking empty data.
 */
describe('maskPayload', () => {
  it('rfc-6455-5.3 returns empty buffer for empty payload', () => {
    const payload = Buffer.alloc(0);
    const maskingKey = Buffer.from([0xaa, 0xbb, 0xcc, 0xdd]);

    const result = maskPayload(payload, maskingKey);

    expect(result.length).toBe(0);
    expect(result.equals(Buffer.alloc(0))).toBe(true);
  });
});
