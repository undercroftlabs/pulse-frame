import { HEADER_BASE_LENGTH, MASKING_KEY_LENGTH } from '@/types/constants';
import { calculatePayloadEncodingLength } from '../calculate-payload-encoding-length';
import { createPayloadBuffer } from '../create-payload-buffer';
import { maskPayload } from '../mask-payload';
import { packHeaderBytes } from '../pack-header-bytes';
import { PulseFrame } from '../types/pulse-frame';

/**
 * Converts a `PulseFrame` object into a raw WebSocket frame buffer.
 *
 * This function serializes a fully constructed frame into a binary format
 * suitable for transmission over a socket, following the WebSocket framing
 * rules defined in [RFC 6455 §5.2](https://datatracker.ietf.org/doc/html/rfc6455#section-5.2).
 *
 * It handles:
 * - Base header byte construction (FIN, RSV1–3, opcode, MASK).
 * - Extended payload length encoding if necessary (16-bit or 64-bit).
 * - Optional payload masking (XOR with masking key).
 * - Concatenation of header and final payload buffer.
 *
 * @param frame - The `PulseFrame` instance to serialize.
 * @returns A `Buffer` containing the fully encoded WebSocket frame.
 *
 * @see RFC 6455 §5.2 - Base Framing Protocol
 */
export function frameToBuffer(frame: PulseFrame): Buffer {
  const payload = frame.getPayload();
  const payloadLength = payload.length;

  const extendedLengthBytes = calculatePayloadEncodingLength(payloadLength);
  const extendedPayloadBuffer = createPayloadBuffer(payloadLength);

  let headerLength = HEADER_BASE_LENGTH + extendedLengthBytes;
  if (frame.isMasked()) {
    headerLength += MASKING_KEY_LENGTH;
  }

  const finalPayload = frame.isMasked()
    ? maskPayload(payload, frame.getHeader().maskingKey!)
    : payload;

  const header = Buffer.alloc(headerLength);
  const [byte0, byte1] = packHeaderBytes(frame.getHeader(), payloadLength);
  header[0] = byte0;
  header[1] = byte1;

  extendedPayloadBuffer.copy(header, HEADER_BASE_LENGTH);

  if (frame.isMasked()) {
    frame
      .getHeader()
      .maskingKey!.copy(header, HEADER_BASE_LENGTH + extendedLengthBytes);
  }

  return Buffer.concat([header, finalPayload]);
}
