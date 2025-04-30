import { PulseFrame } from '../types/pulse-frame';
import { PulseFrameHeader } from '../types/pulse-frame-header';
import { PulseFrameOpcode } from '../types/pulse-frame-opcode';

/**
 * Creates a WebSocket text frame with the given UTF-8 string.
 *
 * The string is encoded as UTF-8 and inserted directly into the payload.
 * This is a convenience wrapper for quickly sending simple text messages.
 *
 * @param text - The UTF-8 string to send as the frame payload.
 * @returns A complete PulseFrame representing a text frame.
 *
 * @see RFC 6455 §5.6 - Data Frames (Text)
 */
export function createFrameFromText(text: string): PulseFrame {
  const payload = Buffer.from(text, 'utf8');

  const header: PulseFrameHeader = {
    fin: 1,
    rsv1: 0,
    rsv2: 0,
    rsv3: 0,
    mask: 0,
    opcode: PulseFrameOpcode.TEXT,
    length: payload.length,
    extensionDataLength: 0,
    maskingKey: undefined,
  };

  return new PulseFrame(header, payload, undefined, payload);
}
