import {
  EXTENDED_LENGTH_16_BYTES,
  EXTENDED_LENGTH_64_BYTES,
  MAX_16BIT_PAYLOAD_LENGTH,
  PAYLOAD_EXTENDED_16,
} from '@/types/constants';

/**
 * Calculates how many extra bytes are needed to encode the payload length in a WebSocket frame header.
 *
 * According to [RFC 6455 §5.2](https://datatracker.ietf.org/doc/html/rfc6455#section-5.2), the payload
 * length field is encoded as follows:
 *
 * - If payload length < 126 → length fits in 7 bits (no extra bytes).
 * - If payload length ≥ 126 and < 2^16 → 2 extra bytes are added (16-bit unsigned).
 * - If payload length ≥ 2^16 → 8 extra bytes are added (64-bit unsigned).
 *
 * This function is used during frame construction to determine how many bytes
 * must be reserved for length encoding in the final header.
 *
 * @param payloadLength - The number of payload bytes to encode.
 * @returns The number of additional bytes needed for extended length encoding.
 *
 * @see RFC 6455 §5.2 - Base Framing Protocol
 */
export function calculatePayloadEncodingLength(payloadLength: number): number {
  if (payloadLength < PAYLOAD_EXTENDED_16) {
    return 0;
  }
  if (payloadLength < MAX_16BIT_PAYLOAD_LENGTH) {
    return EXTENDED_LENGTH_16_BYTES;
  }
  return EXTENDED_LENGTH_64_BYTES;
}
