/**
 * Bit flag constants used to parse the first two bytes of a WebSocket frame header.
 *
 * These flags are used for bitmask operations during encoding/decoding of header fields.
 */
export enum PulseFrameHeaderFlags {
  FIN = 0b10000000,
  RSV1 = 0b01000000,
  RSV2 = 0b00100000,
  RSV3 = 0b00010000,
  OPCODE = 0b00001111,
  MASK = 0b10000000,
  LENGTH = 0b01111111,
}