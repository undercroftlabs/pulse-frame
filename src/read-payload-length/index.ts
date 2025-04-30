import {
  PAYLOAD_EXTENDED_16,
  EXTENDED_LENGTH_16_BYTES,
  PAYLOAD_EXTENDED_64,
  EXTENDED_LENGTH_64_BYTES,
} from '@/types/constants';
import { PulseFrameError } from '../types/pulse-frame-error';

/**
 * Reads the actual payload length from a WebSocket frame buffer.
 *
 * Handles basic (7-bit), 16-bit extended, and 64-bit extended length fields as per RFC 6455 §5.2.
 *
 * @param buffer - The buffer containing the WebSocket frame.
 * @param payloadLen - The initial payload length value from the header (may be 126 or 127).
 * @param offset - The offset at which the extended payload length starts.
 * @returns The decoded full payload length.
 *
 * @throws PulseFrameError - If the buffer is incomplete or the payload length is invalid.
 *
 * @see RFC 6455 §5.2 - Base Framing Protocol
 */
export function readPayloadLength(
  buffer: Buffer,
  payloadLen: number,
  offset: number,
): number {
  // If the length is less than PAYLOAD_EXTENDED_16, return it directly
  // as it represents the actual payload length directly.
  if (payloadLen < PAYLOAD_EXTENDED_16) {
    return payloadLen;
  }

  // If the length is PAYLOAD_EXTENDED_16, read the next 2 bytes from the buffer
  // to get the actual payload length.
  if (payloadLen === PAYLOAD_EXTENDED_16) {
    if (buffer.length < offset + EXTENDED_LENGTH_16_BYTES) {
      throw new PulseFrameError(
        'Incomplete frame: expected 2 bytes for extended length',
      );
    }
    return buffer.readUInt16BE(offset);
  }

  // If the length is PAYLOAD_EXTENDED_64, read the next 8 bytes from the buffer
  // to get the actual payload length.
  if (payloadLen === PAYLOAD_EXTENDED_64) {
    if (buffer.length < offset + EXTENDED_LENGTH_64_BYTES) {
      throw new PulseFrameError(
        'Incomplete frame: expected 8 bytes for extended length',
      );
    }
    return Number(buffer.readBigUInt64BE(offset));
  }

  // If the length is not one of the expected values, throw an error
  throw new PulseFrameError('Invalid payload length');
}
