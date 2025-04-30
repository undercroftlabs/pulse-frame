import {
  OPCODE_MASK,
  PAYLOAD_EXTENDED_16,
  MAX_16BIT_PAYLOAD_LENGTH,
  PAYLOAD_EXTENDED_64,
} from '@/types/constants';
import { PulseFrameHeader } from '../types/pulse-frame-header';

/**
 * Packs the first two bytes of a WebSocket frame header as defined in RFC 6455 §5.2.
 *
 * - `byte0` contains FIN, RSV1–3, and the 4-bit opcode.
 * - `byte1` contains the MASK bit and the payload length indicator.
 *
 * The actual payload length is handled elsewhere. This function determines whether
 * the length fits in 7 bits or requires extended length encoding (16-bit or 64-bit).
 *
 * @param header - The parsed frame header structure.
 * @param payloadLength - The length of the frame’s payload data.
 * @returns A 2-element tuple containing `byte0` and `byte1` to be written to the frame buffer.
 *
 * @see RFC 6455 §5.2 - Base Framing Protocol
 */
export const packHeaderBytes = (
  header: PulseFrameHeader,
  payloadLength: number,
): [number, number] => {
  const byte0 =
    (header.fin << 7) |
    (header.rsv1 << 6) |
    (header.rsv2 << 5) |
    (header.rsv3 << 4) |
    (header.opcode & OPCODE_MASK);

  const payloadIndicator =
    payloadLength < PAYLOAD_EXTENDED_16
      ? payloadLength
      : payloadLength < MAX_16BIT_PAYLOAD_LENGTH
      ? PAYLOAD_EXTENDED_16
      : PAYLOAD_EXTENDED_64;

  const byte1 = (header.mask << 7) | payloadIndicator;

  return [byte0, byte1];
};
