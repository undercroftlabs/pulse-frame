import { createPayloadBuffer } from '..';

/**
 * @spec RFC 6455 §5.2 - Base Framing Protocol
 *
 * Payload lengths larger than 65535 must be encoded using 8 extra bytes (64-bit unsigned).
 * This test ensures those payloads are encoded in Big Endian format as required by the protocol.
 */
describe('createPayloadBuffer', () => {
  it.each([65536, 999999, 2 ** 32, 2 ** 40])(
    'rfc-6455-5.2 creates 8-byte buffer for payload length %i',
    (payloadLength) => {
      const buf = createPayloadBuffer(payloadLength);
      expect(buf.length).toBe(8);
      expect(buf.readBigUInt64BE(0)).toBe(BigInt(payloadLength));
    },
  );
});
