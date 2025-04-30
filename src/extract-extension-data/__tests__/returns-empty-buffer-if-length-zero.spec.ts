import { extractExtensionData } from "..";

/**
 * @spec RFC 6455 §5.2 - Base Framing Protocol
 *
 * If no extensions are negotiated, the extension data length will be 0.
 * In this case, the function must return an empty buffer.
 */
describe('extractExtensionData', () => {
  it('rfc-6455-5.2 returns empty buffer if length is 0', () => {
    const buffer = Buffer.from('irrelevant');
    const result = extractExtensionData(buffer, 0, 0);
    expect(result.equals(Buffer.alloc(0))).toBe(true);
  });
});
