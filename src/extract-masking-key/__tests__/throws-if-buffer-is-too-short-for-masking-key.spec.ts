import { extractMaskingKey } from '..';

/**
 * @spec RFC 6455 §5.3 - Data Framing
 *
 * If a masking key is required but not fully present, this is a protocol violation.
 * This test ensures such a case throws an appropriate error.
 */
describe('extractMaskingKey', () => {
  it('rfc-6455-5.3 throws if buffer is too short for masking key', () => {
    const buffer = Buffer.from([0x01, 0x02]); // too short
    expect(() => extractMaskingKey(buffer, 0, 4)).toThrow(
      'Incomplete frame: expected 4 bytes for masking key',
    );
  });
});
