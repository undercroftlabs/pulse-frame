export const StrictUtf8Decoder = new TextDecoder('utf-8', { fatal: true });

export function decodeUtf8Strict(buffer: Buffer): string {
  return StrictUtf8Decoder.decode(buffer);
}