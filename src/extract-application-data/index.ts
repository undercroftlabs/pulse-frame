import { PulseFrameError } from "../types/pulse-frame-error";

/**
 * Extracts the application-level data from a WebSocket frame's payload buffer,
 * skipping over any extension data that precedes it.
 *
 * @param buffer - The payload buffer (extension + application data).
 * @param extensionDataLength - The number of bytes reserved for extension data.
 * @returns A subarray containing only the application data portion.
 *
 * @throws PulseFrameError if the extension length exceeds the total buffer length.
 *
 * @see RFC 6455 §5.2 - Base Framing Protocol
 */
export function extractApplicationData(buffer: Buffer, extensionDataLength: number): Buffer {
  if (extensionDataLength === 0) {
    return buffer;
  }

  if (extensionDataLength > buffer.length) {
    throw new PulseFrameError('Invalid application data length: exceeds buffer size');
  }

  return buffer.subarray(extensionDataLength);
};
