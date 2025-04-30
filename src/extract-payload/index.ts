import { PulseFrameError } from "../types/pulse-frame-error";

/**
 * Extracts the payload portion of a WebSocket frame from the buffer.
 *
 * This function verifies that the buffer contains enough bytes from the given
 * start offset to read the declared payload length. It returns a view (not a copy)
 * into the original buffer containing the payload data.
 *
 * @param buffer - The full WebSocket frame buffer.
 * @param start - The byte offset where the payload begins.
 * @param length - The expected length of the payload in bytes.
 * @returns A buffer slice representing the payload data.
 *
 * @throws {PulseFrameError} If the buffer does not contain enough bytes to satisfy the payload length.
 *
 * @see RFC 6455 §5.2 - Base Framing Protocol
 */
export function extractPayload(buffer: Buffer, start: number, length: number): Buffer {
  const payloadEnd = start + length;
  if (buffer.length < payloadEnd) {
    throw new PulseFrameError('Incomplete frame: not enough bytes for payload');
  }
  return buffer.subarray(start, payloadEnd);
};
