import { Bit } from '@/types/bit';
import { PulseFrameHeader } from '../types/pulse-frame-header';
import { PulseFrameHeaderFlags } from '../types/pulse-frame-header-flags';

/**
 * Parses the first two bytes of a WebSocket frame buffer and extracts the frame header.
 *
 * According to [RFC 6455 §5.2](https://datatracker.ietf.org/doc/html/rfc6455#section-5.2),
 * the first two bytes of a frame contain:
 *
 * Byte 1:
 * - FIN (1 bit)
 * - RSV1, RSV2, RSV3 (1 bit each)
 * - OPCODE (4 bits)
 *
 * Byte 2:
 * - MASK (1 bit)
 * - Payload Length (7 bits, which may indicate extended length)
 *
 * This function **does not** extract extended payload length or the masking key.
 * It only parses the initial fixed-size portion of the header.
 *
 * @param buffer - The frame buffer to parse (must be at least 2 bytes).
 * @param extensionDataLength - The length of any expected extension data (used downstream).
 * @returns A partially filled `PulseFrameHeader` with core metadata parsed.
 *
 * @throws Will throw if `buffer` is less than 2 bytes long.
 */
export function parseHeader(
  buffer: Buffer,
  extensionDataLength: number,
): PulseFrameHeader {
  const firstByte = buffer[0];
  const secondByte = buffer[1];

  return {
    fin: ((firstByte & PulseFrameHeaderFlags.FIN) >>> 7) as Bit,
    rsv1: ((firstByte & PulseFrameHeaderFlags.RSV1) >>> 6) as Bit,
    rsv2: ((firstByte & PulseFrameHeaderFlags.RSV2) >>> 5) as Bit,
    rsv3: ((firstByte & PulseFrameHeaderFlags.RSV3) >>> 4) as Bit,
    mask: ((secondByte & PulseFrameHeaderFlags.MASK) >>> 7) as Bit,
    opcode: firstByte & PulseFrameHeaderFlags.OPCODE,
    length: secondByte & PulseFrameHeaderFlags.LENGTH,
    extensionDataLength,
    maskingKey: undefined,
  };
}
