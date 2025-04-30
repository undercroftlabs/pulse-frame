import { calculatePayloadEncodingLength } from '..';

/**
 * @spec RFC 6455 §5.2 - Base Framing Protocol
 *
 * Payloads between 126 and 65535 bytes:
 * - These require 2 additional bytes to represent the payload length.
 * - Encoded as a 16-bit unsigned integer (2 bytes) following the base header.
 *
 * These tests assert that the `calculatePayloadEncodingLength` function correctly
 * returns 2 extra bytes for payloads in this range.
 */
describe('calculatePayloadEncodingLength', () => {
  const ranges = [
    126, // Boundary: first payload needing 2 extra bytes
    127, // Just over the boundary
    300, // Small medium payload
    1024, // 1KB payload
    32000, // Typical large-ish payload
    65535, // Maximum for 16-bit extended payload
  ];

  it.each(ranges)('rfc-6455-5.2 payload length of %i', (payloadLength) => {
    expect(calculatePayloadEncodingLength(payloadLength)).toBe(2);
  });
});
