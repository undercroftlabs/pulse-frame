import { PAYLOAD_EXTENDED_64 } from '@/types/constants';
import { readPayloadLength } from '..';

/**
 * @spec RFC 6455 §5.2 - Base Framing Protocol
 *
 * Payload length of 127 means next 8 bytes hold the actual length (64-bit unsigned).
 */
describe('readPayloadLength', () => {
  it('rfc-6455-5.2 reads 64-bit extended payload length', () => {
    const buffer = Buffer.alloc(8);
    buffer.writeBigUInt64BE(BigInt(90000), 0);
    expect(readPayloadLength(buffer, PAYLOAD_EXTENDED_64, 0)).toBe(90000);
  });
});
