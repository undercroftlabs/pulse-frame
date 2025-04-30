import { PAYLOAD_EXTENDED_16 } from '@/types/constants';
import { readPayloadLength } from '..';

/**
 * @spec RFC 6455 §5.2 - Base Framing Protocol
 *
 * Payload length of 126 means next 2 bytes hold the actual length (16-bit unsigned).
 */
describe('readPayloadLength', () => {
  it('rfc-6455-5.2 reads 16-bit extended payload length', () => {
    const buffer = Buffer.alloc(2);
    buffer.writeUInt16BE(300, 0); // Actual length = 300
    expect(readPayloadLength(buffer, PAYLOAD_EXTENDED_16, 0)).toBe(300);
  });
});
