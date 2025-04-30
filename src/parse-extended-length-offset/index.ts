import {
  PAYLOAD_EXTENDED_16,
  EXTENDED_LENGTH_16_BYTES,
  PAYLOAD_EXTENDED_64,
  EXTENDED_LENGTH_64_BYTES,
} from '@/types/constants';
import { PulseFrameError } from '../types/pulse-frame-error';

/**
 * Determines the number of extra bytes used to represent the payload length
 * in a WebSocket frame, based on the initial 7-bit length field.
 *
 * @param payloadLen - The value from the 7-bit payload length field.
 * @returns The number of bytes used for the extended payload length (0, 2, or 8).
 *
 * @throws PulseFrameError - If the value is invalid according to RFC 6455.
 *
 * @see RFC 6455 §5.2 - Base Framing Protocol
 */
export function parseExtendedLengthOffset(payloadLen: number): number {
  if (payloadLen < PAYLOAD_EXTENDED_16) {
    return 0;
  }
  if (payloadLen === PAYLOAD_EXTENDED_16) {
    return EXTENDED_LENGTH_16_BYTES;
  }
  if (payloadLen === PAYLOAD_EXTENDED_64) {
    return EXTENDED_LENGTH_64_BYTES;
  }

  throw new PulseFrameError('Invalid payload length for extended length');
}
