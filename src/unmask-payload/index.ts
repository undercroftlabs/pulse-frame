import { MASKING_KEY_LENGTH } from "@/types/constants";

/**
 * Unmasks a masked WebSocket payload using the provided masking key.
 *
 * This function reverses the masking applied per [RFC 6455 §5.3](https://datatracker.ietf.org/doc/html/rfc6455#section-5.3), 
 * which uses a 4-byte masking key applied cyclically across the payload.
 *
 * Each byte of the payload is XOR’d with a byte from the masking key:
 *
 * ```
 * transformed-octet-i = original-octet-i XOR masking-key-octet-(i mod 4)
 * ```
 *
 * @param payload - The masked payload buffer to unmask.
 * @param maskingKey - The 4-byte masking key used to encode the payload.
 * @returns A new `Buffer` containing the unmasked payload.
 *
 * @remarks
 * - Assumes the caller has already validated that masking is appropriate.
 * - This function does not perform any validation on the length of the masking key.
 *   It is assumed to be exactly 4 bytes.
 *
 * @see RFC 6455 §5.3 - Masking
 */
export function unmaskPayload(payload: Buffer, maskingKey: Buffer): Buffer {
  const unmasked = Buffer.allocUnsafe(payload.length);
  for (let i = 0; i < payload.length; i++) {
    unmasked[i] = payload[i] ^ maskingKey[i % MASKING_KEY_LENGTH];
  }
  return unmasked;
}