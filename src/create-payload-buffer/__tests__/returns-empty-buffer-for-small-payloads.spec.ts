import { createPayloadBuffer } from '..';

/**
 * @spec RFC 6455 §5.2 - Base Framing Protocol
 *
 * Payload lengths less than 126 are encoded directly in the 7-bit payload length field.
 * No extended payload buffer is needed for these values.
 */
describe('createPayloadBuffer', () => {
  it.each([0, 1, 10, 50, 100, 125])(
    'rfc-6455-5.2 returns empty buffer for payload length %i',
    (payloadLength) => {
      const buf = createPayloadBuffer(payloadLength);
      expect(buf.length).toBe(0);
    },
  );
});
