import { createPayloadBuffer } from '..';

/**
 * @spec RFC 6455 §5.2 - Base Framing Protocol
 *
 * Payload lengths between 126 and 65535 must be encoded using 2 extra bytes (16-bit unsigned).
 * This test verifies those payloads are correctly encoded.
 */
describe('createPayloadBuffer', () => {
  it.each([126, 127, 300, 1024, 32000, 65535])(
    'rfc-6455-5.2 creates 2-byte buffer for payload length %i',
    (payloadLength) => {
      const buf = createPayloadBuffer(payloadLength);
      expect(buf.length).toBe(2);
      expect(buf.readUInt16BE(0)).toBe(payloadLength);
    },
  );
});
