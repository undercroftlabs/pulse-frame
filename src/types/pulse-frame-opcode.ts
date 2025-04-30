/**
 * Enum of all valid WebSocket frame opcodes, defined by RFC 6455 §5.2.
 */
export enum PulseFrameOpcode {
  /** Continuation frame for fragmented messages */
  CONTINUATION = 0x0,

  /** Text message frame */
  TEXT = 0x1,

  /** Binary message frame */
  BINARY = 0x2,

  /** Connection close frame */
  CLOSE = 0x8,

  /** Ping frame */
  PING = 0x9,

  /** Pong frame */
  PONG = 0xa,
}