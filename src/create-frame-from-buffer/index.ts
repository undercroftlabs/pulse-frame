import { extractApplicationData } from '../extract-application-data';
import { extractMaskingKey } from '../extract-masking-key';
import { extractPayload } from '../extract-payload';
import { parseExtendedLengthOffset } from '../parse-extended-length-offset';
import { parseHeader } from '../parse-header';
import { PulseFrame } from '../types/pulse-frame';
import { PulseFrameOptions } from '../types/pulse-frame-options';
import { unmaskPayload } from '../unmask-payload';
import { validateCloseFramePayload } from '../validate-close-frame-payload';
import { validateExtensions } from '../validate-extensions';
import { validateOpcode } from '../validate-op-code';
import { PulseFrameOpcode } from '../types/pulse-frame-opcode';
import { PulseFrameError } from '../types/pulse-frame-error';
import { readPayloadLength } from '../read-payload-length';
import { extractExtensionData } from '../extract-extension-data';
import { HEADER_BASE_LENGTH, MASKING_KEY_LENGTH } from '@/types/constants';

/**
 * Parses a WebSocket frame from a raw buffer according to [RFC 6455 §5](https://datatracker.ietf.org/doc/html/rfc6455#section-5).
 *
 * This function:
 * - Validates header size and structure
 * - Extracts masking key, extended payload length, and payload data
 * - Validates RSV bits, opcodes, and control frame rules
 * - Unmasks payload if required
 * - Separates extension data from application data
 *
 * Supports optional extension handling via {@link PulseFrameOptions}.
 *
 * @param buffer - The raw incoming buffer containing a WebSocket frame.
 * @param options - Optional framing behavior configuration, including extension support and extension data length.
 * @returns A parsed and validated {@link PulseFrame} object.
 *
 * @throws {PulseFrameError} If the frame is incomplete, invalid, or violates protocol constraints.
 *
 * @example
 * ```ts
 * const frame = createFrameFromBuffer(buffer, {
 *   extensionLength: 8,
 *   extensionSupport: { rsv1: true }
 * });
 * ```
 *
 * @see RFC 6455 §5 - Data Framing
 * @see RFC 6455 §5.5 - Control Frames
 * @see RFC 6455 §7 - Closing Handshake
 */
export function createFrameFromBuffer(
  buffer: Buffer,
  options?: PulseFrameOptions,
): PulseFrame {
  // Fail early if the buffer isn't big enough to have a header
  if (buffer.length < HEADER_BASE_LENGTH) {
    throw new PulseFrameError('Incomplete frame: missing first two bytes');
  }

  // Get the extension data length from options or default to 0
  const extensionDataLength = options?.extensionLength ?? 0;

  // Get the extension support from options or default to no extensions
  const extensionSupport = options?.extensionSupport ?? {
    rsv1: false,
    rsv2: false,
    rsv3: false,
  };

  // Parse the header from the buffer
  const frameHeader = parseHeader(buffer, extensionDataLength);

  const isMasked = frameHeader.mask === 1 || !!frameHeader.maskingKey;

  // Validate the frame header extensions
  validateExtensions(frameHeader, extensionSupport);

  // Validate the frame header opcode
  validateOpcode(frameHeader);

  // Get the payload length from the frame header
  const payloadLength = readPayloadLength(
    buffer,
    frameHeader.length,
    HEADER_BASE_LENGTH,
  );

  // Parse the extended length offset from the frame header
  const extendedLengthOffset = parseExtendedLengthOffset(frameHeader.length);

  // Start reading from the end of the header
  if (isMasked) {
    const maskingKey = extractMaskingKey(
      buffer,
      HEADER_BASE_LENGTH + extendedLengthOffset,
      MASKING_KEY_LENGTH,
    );
    frameHeader.maskingKey = maskingKey;
  }

  // Determine the read offset based on whether the frame is masked
  // and the length of the extended payload.
  const readOffset =
    HEADER_BASE_LENGTH +
    extendedLengthOffset +
    (isMasked ? MASKING_KEY_LENGTH : 0);

  // Extract the payload data based on the frame header length
  const rawPayloadData = extractPayload(buffer, readOffset, payloadLength);

  // Unmask the payload data if the frame is masked
  const payloadData = isMasked
    ? unmaskPayload(rawPayloadData, frameHeader.maskingKey!)
    : rawPayloadData;

  // Extract the extension data from the payload data
  const extensionData = extractExtensionData(
    payloadData,
    0,
    extensionDataLength,
  );

  // Extract the application data from the payload data
  const applicationData = extractApplicationData(
    payloadData,
    extensionDataLength,
  );

  if (frameHeader.opcode === PulseFrameOpcode.CLOSE) {
    validateCloseFramePayload(applicationData);
  }

  return new PulseFrame(
    frameHeader,
    payloadData,
    extensionData,
    applicationData,
  );
}
