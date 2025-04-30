import { extractApplicationData } from "..";

/**
 * @spec RFC 6455 §5.2 - Base Framing Protocol
 *
 * Application data is defined as any data beyond the extension data.
 * This test verifies that the correct slice is returned.
 */
describe('extractApplicationData', () => {
    it('rfc-6455-5.2 returns buffer slice beyond extension length', () => {
      const fullBuffer = Buffer.from('extension+application');
      const extensionDataLength = 9; // 'extension'
  
      const result = extractApplicationData(fullBuffer, extensionDataLength);
      const expected = Buffer.from('+' + 'application'); // from index 9 forward
  
      expect(result.equals(expected)).toBe(true);
    });
  });