import { MASKING_KEY_LENGTH } from "@/types/constants";

/**
 * Applies WebSocket masking (XOR with a 4-byte key) to the given payload.
 *
 * @param payload - The payload to be masked.
 * @param maskingKey - A 4-byte masking key.
 * @returns A new masked Buffer.
 *
 * @see RFC 6455 §5.3 - Masking
 */
export function maskPayload(payload: Buffer, maskingKey: Buffer): Buffer {
  const masked = Buffer.allocUnsafe(payload.length);
  for (let i = 0; i < payload.length; i++) {
    masked[i] = payload[i] ^ maskingKey[i % MASKING_KEY_LENGTH];
  }
  return masked;
};
