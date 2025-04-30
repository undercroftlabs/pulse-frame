/**
 * @spec RFC 6455 §5.2 - Base Framing Protocol
 *
 * Payload lengths < 126 should be returned directly without reading further bytes.
 */
import { readPayloadLength } from '..';

describe('readPayloadLength', () => {
  it('rfc-6455-5.2 returns direct length for small payloads', () => {
    const buffer = Buffer.from([]);
    expect(readPayloadLength(buffer, 125, 0)).toBe(125);
  });
});