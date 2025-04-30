import { PulseFrame } from "../types/pulse-frame";
import { PulseFrameError } from "../types/pulse-frame-error";
import { PulseFrameHeader } from "../types/pulse-frame-header";
import { PulseFrameOpcode } from "../types/pulse-frame-opcode";

/**
 * Creates a WebSocket control frame according to [RFC 6455 §5.5](https://datatracker.ietf.org/doc/html/rfc6455#section-5.5).
 *
 * This utility is used to generate Ping, Pong, and Close frames with the correct header flags:
 * - FIN bit is always set (`fin = 1`)
 * - RSV1/RSV2/RSV3 are unset (`0`)
 * - Control frames must not be fragmented
 * - Payload must be ≤ 125 bytes
 *
 * @param payload - Optional binary payload to include (e.g., Pong echo, Close code+reason).
 * @param opcode - The control frame opcode (`PING`, `PONG`, `CLOSE`).
 * @returns A fully constructed {@link PulseFrame} representing the control frame.
 *
 * @throws {PulseFrameError} If the payload exceeds the allowed limit for control frames.
 *
 * @example
 * ```ts
 * const pingFrame = createFrameFromControlCode(Buffer.from('ping'), PulseFrameOpcode.PING);
 * const closeFrame = createFrameFromControlCode(undefined, PulseFrameOpcode.CLOSE);
 * ```
 *
 * @see RFC 6455 §5.5 - Control Frames
 */
export function createFrameFromControlCode(payload: Buffer | undefined, opcode: PulseFrameOpcode): PulseFrame {
  const data = Buffer.isBuffer(payload) ? payload : Buffer.alloc(0);

  if (data.length > 125) {
    throw new PulseFrameError('Control frame payload too large (max 125 bytes)');
  }

  const header: PulseFrameHeader = {
    fin: 1,
    rsv1: 0,
    rsv2: 0,
    rsv3: 0,
    mask: 0,
    opcode,
    length: data.length,
    extensionDataLength: 0,
    maskingKey: undefined,
  };

  return new PulseFrame(header, data, undefined, data);
}
