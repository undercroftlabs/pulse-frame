import {
  MAX_CONTROL_FRAME_PAYLOAD,
  OPCODE_CONTROL_THRESHOLD,
} from '@/types/constants';
import { PulseFrameError } from '../types/pulse-frame-error';
import { PulseFrameHeader } from '../types/pulse-frame-header';
import { PulseFrameOpcode } from '../types/pulse-frame-opcode';

/**
 * Validates the opcode and framing rules for a WebSocket frame header.
 *
 * According to [RFC 6455 §5.5 - Control Frames](https://datatracker.ietf.org/doc/html/rfc6455#section-5.5):
 *
 * - Control frames (e.g. ping/pong/close) must have `FIN=1` (they must not be fragmented).
 * - Control frames must not exceed 125 bytes in payload length.
 * - All frames must use a valid opcode (0x0–0xA).
 *
 * @throws If the opcode is invalid, the control frame is fragmented, or payload is too long.
 */
export function validateOpcode(header: PulseFrameHeader): void {
  const { opcode, fin } = header;

  if (!Object.values(PulseFrameOpcode).includes(opcode)) {
    throw new PulseFrameError(`Invalid opcode: ${opcode}`);
  }

  const isControlFrame = opcode >= OPCODE_CONTROL_THRESHOLD;
  if (isControlFrame && fin !== 1) {
    throw new PulseFrameError(
      'Protocol error: control frames must not be fragmented (FIN=1)',
    );
  }

  if (isControlFrame && header.length > MAX_CONTROL_FRAME_PAYLOAD) {
    throw new PulseFrameError('Control frame payload too long');
  }
}
