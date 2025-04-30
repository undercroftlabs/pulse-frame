import { Bit } from './bit';
import { PulseFrameOpcode } from './pulse-frame-opcode';

/**
 * @spec RFC 6455 §5.2 — Base Framing Protocol
 *
 * Options for constructing a new WebSocket frame in `createFrame`.
 */
export type PulseFrameBuildOptions = {
  /**
   * Final fragment bit. Indicates that this is the final frame of a message.
   * @default 1
   */
  fin?: Bit;

  /**
   * Opcode for the frame, defining its type (e.g., TEXT, BINARY, CLOSE, PING).
   */
  opcode: PulseFrameOpcode;

  /**
   * Reserved bit 1. Used for negotiated extensions (e.g., permessage-deflate).
   * @default 0
   */
  rsv1?: Bit;

  /**
   * Reserved bit 2. Used for negotiated extensions.
   * @default 0
   */
  rsv2?: Bit;

  /**
   * Reserved bit 3. Used for negotiated extensions.
   * @default 0
   */
  rsv3?: Bit;

  /**
   * Indicates if the payload should be masked (typically true for client frames).
   * @default 0
   */
  mask?: Bit;

  /**
   * Optional 4-byte masking key if `mask` is set to 1.
   */
  maskingKey?: Buffer;

  /**
   * The raw payload buffer to send (application + extension data).
   */
  payloadData?: Buffer;

  /**
   * The number of bytes in the payload reserved for extensions.
   * @default 0
   */
  extensionDataLength?: number;

  /**
   * Optional extension data buffer, separate from application payload.
   */
  extensionData?: Buffer;
};
