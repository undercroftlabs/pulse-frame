import { calculatePayloadEncodingLength } from '..';

/**
 * @spec RFC 6455 §5.2 - Base Framing Protocol
 *
 * Payloads larger than 65535 bytes:
 * - These require 8 additional bytes to represent the payload length.
 * - Encoded as a 64-bit unsigned integer (8 bytes) following the base header.
 *
 * These tests assert that the `calculatePayloadEncodingLength` function correctly
 * returns 8 extra bytes for payloads larger than 65535 bytes.
 */
describe('calculatePayloadEncodingLength', () => {
  const renges = [
    65536, // Boundary: first payload needing 8 extra bytes
    999_999, // Arbitrary large payload
    2 ** 32, // Very large 4GB payload
    2 ** 40, // Extremely large payload (1TB)
  ];

  it.each(renges)('rfc-6455-5.2 payload length of %i', (payloadLength) => {
    expect(calculatePayloadEncodingLength(payloadLength)).toBe(8);
  });
});
