import { extractApplicationData } from "..";

/**
 * @spec RFC 6455 §5.2 - Base Framing Protocol
 *
 * If the extension data length is zero, the full payload buffer is considered application data.
 * This test ensures that `extractApplicationData` returns the entire buffer unchanged in this case.
 */
describe('extractApplicationData', () => {
  it('rfc-6455-5.2 returns full buffer if extension length is zero', () => {
    const buffer = Buffer.from('hello world', 'utf8');
    const result = extractApplicationData(buffer, 0);

    expect(result).toBe(buffer); 
    expect(result.toString()).toBe('hello world');
  });
});