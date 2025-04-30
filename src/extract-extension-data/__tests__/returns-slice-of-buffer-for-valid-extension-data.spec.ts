import { extractExtensionData } from '..';

/**
 * @spec RFC 6455 §5.2 - Base Framing Protocol
 *
 * If extension data is present and valid, this function must return the correct slice.
 */
describe('extractExtensionData', () => {
  it('rfc-6455-5.2 returns correct buffer slice for valid range', () => {
    const buffer = Buffer.from('extension|app');
    const result = extractExtensionData(buffer, 0, 9);
    expect(result.equals(Buffer.from('extension'))).toBe(true);
  });
});
