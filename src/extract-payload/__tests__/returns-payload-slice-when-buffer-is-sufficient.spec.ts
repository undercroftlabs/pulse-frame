import { extractPayload } from "..";

/**
 * @spec RFC 6455 §5.2 - Base Framing Protocol
 *
 * The payload of a frame begins immediately after the header and optional fields.
 * This test ensures that the payload is correctly sliced from the buffer.
 */
describe('extractPayload', () => {
  it('rfc-6455-5.2 returns payload slice when buffer has enough data', () => {
    const buffer = Buffer.from([0x00, 0x01, 0x02, 0x03, 0x04, 0x05]);
    const result = extractPayload(buffer, 2, 3); // [0x02, 0x03, 0x04]
    expect(result.equals(Buffer.from([0x02, 0x03, 0x04]))).toBe(true);
  });
});
