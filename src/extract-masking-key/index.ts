import { PulseFrameError } from '../types/pulse-frame-error';

/**
 * Extracts the 4-byte masking key from a WebSocket frame buffer.
 *
 * According to RFC 6455 §5.3, if the mask bit is set (MASK = 1),
 * the frame MUST include a 4-byte masking key immediately following
 * the payload length field.
 *
 * This function verifies that enough data exists and returns a
 * reference to the masking key without copying data.
 *
 * @param buffer - The full frame buffer.
 * @param start - The byte offset where the masking key starts.
 * @param length - The number of bytes expected (must be 4).
 * @returns A view into the masking key within the buffer.
 *
 * @throws {PulseFrameError} If the buffer does not contain enough bytes.
 *
 * @see RFC 6455 §5.3 - Data Framing
 */
export function extractMaskingKey(buffer: Buffer, start: number, length: number): Buffer {
  const maskingKeyEnd = start + length;
  if (buffer.length < maskingKeyEnd) {
    throw new PulseFrameError('Incomplete frame: expected 4 bytes for masking key');
  }

  return buffer.subarray(start, maskingKeyEnd);
}
