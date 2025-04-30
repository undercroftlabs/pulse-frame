import { calculatePayloadEncodingLength } from '..';

/**
 * @spec RFC 6455 §5.2 - Base Framing Protocol
 *
 * Payloads smaller than 126 bytes:
 * - These are encoded directly in the 7-bit payload field.
 * - No additional bytes are used to represent the payload length.
 *
 * These tests assert that the `calculatePayloadEncodingLength` function correctly
 * returns 0 extra bytes for this range.
 */
describe('calculatePayloadEncodingLength', () => {
  const ranges = [
    0, // Very first possible payload
    1, // Tiny payload
    10, // Small payload
    50, // Mid-range small payload
    100, // Large small payload
    125, // Max payload before extension needed
  ];
  it.each(ranges)('rfc-6455-5.2 payload length of %i', (payloadLength) => {
    expect(calculatePayloadEncodingLength(payloadLength)).toBe(0);
  });
});
