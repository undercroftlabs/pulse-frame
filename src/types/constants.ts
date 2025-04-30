/**
 * Payload length value indicating that a 16-bit unsigned integer
 * follows to represent the actual payload length.
 *
 * RFC 6455 §5.2 "Payload length"
 */
export const PAYLOAD_EXTENDED_16 = 126;

/**
 * Payload length value indicating that a 64-bit unsigned integer
 * follows to represent the actual payload length.
 *
 * RFC 6455 §5.2 "Payload length"
 */
export const PAYLOAD_EXTENDED_64 = 127;

/**
 * The length in bytes of the masking key used to mask payload data.
 *
 * RFC 6455 §5.3 "Masking"
 */
export const MASKING_KEY_LENGTH = 4;

/**
 * The maximum allowed payload length (in bytes) for control frames
 * (e.g., ping, pong, close).
 *
 * RFC 6455 §5.5 "Control Frames"
 */
export const MAX_CONTROL_FRAME_PAYLOAD = 125;

/**
 * The base length (in bytes) of a WebSocket frame header without
 * extended payload length or masking key.
 *
 * RFC 6455 §5.2 "Base Framing Protocol"
 */
export const HEADER_BASE_LENGTH = 2;

/**
 * Opcode values >= 0x8 (8–15) are reserved for control frames.
 *
 * RFC 6455 §5.2 "Opcode"
 */
export const OPCODE_CONTROL_THRESHOLD = 0x8;

/**
 * Maximum payload length (in bytes) that can be represented by the base
 * payload length field before requiring extended 16-bit encoding.
 *
 * RFC 6455 §5.2 "Payload length"
 */
export const MAX_16BIT_PAYLOAD_LENGTH = 65536;

/**
 * Bitmask (0x0F) used to extract the opcode from the first byte of a WebSocket
 * frame.
 *
 * RFC 6455 §5.2 "Opcode"
 */
export const OPCODE_MASK = 0x0f;

/**
 * Number of bytes used to represent a 16-bit extended payload length.
 *
 * RFC 6455 §5.2 "Payload length"
 */
export const EXTENDED_LENGTH_16_BYTES = 2;

/**
 * Number of bytes used to represent a 64-bit extended payload length.
 *
 * RFC 6455 §5.2 "Payload length"
 */
export const EXTENDED_LENGTH_64_BYTES = 8;