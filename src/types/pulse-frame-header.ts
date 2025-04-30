import { Bit } from './bit';
import { PulseFrameOpcode } from './pulse-frame-opcode';

/**
 * Represents a parsed WebSocket frame header.
 * Contains control flags, opcode, payload length, and optional masking information.
 */
export type PulseFrameHeader = {
  /** Final frame indicator (FIN bit) */
  fin: Bit;

  /** Reserved bit 1 (RSV1) */
  rsv1: Bit;

  /** Reserved bit 2 (RSV2) */
  rsv2: Bit;

  /** Reserved bit 3 (RSV3) */
  rsv3: Bit;

  /** Indicates whether the payload is masked (MASK bit) */
  mask: Bit;

  /** The opcode defining the frame type (e.g., text, binary, ping) */
  opcode: PulseFrameOpcode;

  /** Payload length (7-bit base or extended if necessary) */
  length: number;

  /** Length of the extension data prefix, if any */
  extensionDataLength: number;

  /** The 4-byte masking key, present only if `mask` is 1 */
  maskingKey?: Buffer;
};
