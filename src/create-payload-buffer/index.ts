import {
  PAYLOAD_EXTENDED_16,
  MAX_16BIT_PAYLOAD_LENGTH,
  EXTENDED_LENGTH_16_BYTES,
  EXTENDED_LENGTH_64_BYTES,
} from '@/types/constants';

/**
 * Creates a buffer containing the extended payload length for a WebSocket frame.
 *
 * According to RFC 6455 §5.2, payload lengths are encoded as:
 * - 7-bit value (0–125): directly encoded in the header, no extended length bytes needed.
 * - 126 (16-bit): followed by a 2-byte unsigned integer for payload length.
 * - 127 (64-bit): followed by an 8-byte unsigned integer for payload length.
 *
 * This function returns the appropriate extended length field as a buffer.
 * If no extended bytes are needed (i.e. payload < 126), it returns an empty buffer.
 *
 * @param length - The actual payload length.
 * @returns A Buffer containing the encoded extended length, or empty if not needed.
 *
 * @see RFC 6455 §5.2 - Base Framing Protocol
 */
export function createPayloadBuffer(length: number): Buffer {
  if (length < PAYLOAD_EXTENDED_16) {
    // Fits in 7-bit field, no extended bytes needed
    return Buffer.alloc(0);
  }

  if (length < MAX_16BIT_PAYLOAD_LENGTH) {
    const buf = Buffer.alloc(EXTENDED_LENGTH_16_BYTES);
    buf.writeUInt16BE(length, 0);
    return buf;
  }

  const buf = Buffer.alloc(EXTENDED_LENGTH_64_BYTES);
  buf.writeBigUInt64BE(BigInt(length), 0);
  return buf;
}
