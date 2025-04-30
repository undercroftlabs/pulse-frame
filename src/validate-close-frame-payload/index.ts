import { PulseFrameError } from '../types/pulse-frame-error';
import { decodeUtf8Strict } from '@/utils/utf8';

/**
 * Validates the payload of a WebSocket Close frame according to RFC 6455 §5.5.1 and §7.4.
 *
 * A Close frame MAY contain a body, which consists of:
 * - A 2-byte status code (unsigned 16-bit integer, network byte order)
 * - An optional UTF-8 encoded reason string
 *
 * This function enforces:
 * - If a payload is present, it must be 0 bytes, or ≥2 bytes
 * - If ≥2 bytes, the first two bytes must be a valid close code (1000–4999)
 * - If >2 bytes, the remaining bytes must form a valid UTF-8 string
 *
 * Close codes are defined in RFC 6455 §7.4.1 and include:
 * - 1000 (Normal Closure)
 * - 1001–1015 (reserved)
 * - 3000–4999 (application-defined)
 *
 * @param payload - The raw frame payload to validate.
 * @throws {PulseFrameError} If the payload length is 1, the code is invalid, or the reason is not valid UTF-8.
 *
 * @see {@link https://datatracker.ietf.org/doc/html/rfc6455#section-5.5.1}
 * @see {@link https://datatracker.ietf.org/doc/html/rfc6455#section-7.4}
 */
export const validateCloseFramePayload = (payload: Buffer): void => {
  if (payload.length === 1) {
    throw new PulseFrameError('Protocol error: close frame payload too small');
  }

  if (payload.length >= 2) {
    const code = payload.readUInt16BE(0);
    if (code < 1000 || code > 4999) {
      throw new PulseFrameError(`Protocol error: invalid close code ${code}`);
    }
  }

  if (payload.length > 2) {
    const reasonBuffer = payload.subarray(2);
    try {
      decodeUtf8Strict(reasonBuffer);
    } catch {
      throw new PulseFrameError(
        'Protocol error: invalid UTF-8 in close reason',
      );
    }
  }
};