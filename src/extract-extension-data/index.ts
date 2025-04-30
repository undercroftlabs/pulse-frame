import { PulseFrameError } from "../types/pulse-frame-error";

/**
 * Extracts the extension data segment from a WebSocket frame buffer.
 *
 * @param buffer - The full frame buffer.
 * @param start - The starting offset of the extension data.
 * @param length - The length of the extension data.
 * @returns A `Buffer` slice containing the extension data.
 *
 * @throws PulseFrameError if the extension data exceeds the buffer length.
 *
 * @see RFC 6455 §5.2 - Extension Data
 */
export function extractExtensionData(buffer: Buffer, start: number, length: number): Buffer {
    if (length === 0) {
        return Buffer.alloc(0);
    }

    const end = start + length;
    if (end > buffer.length) {
        throw new PulseFrameError('Incomplete frame: extension data exceeds buffer length');
    }

    return buffer.subarray(start, end);
}
  
  