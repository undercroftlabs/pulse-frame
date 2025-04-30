import { parseHeader } from '..';

/**
 * @spec RFC 6455 §5.2 - Base Framing Protocol
 *
 * A WebSocket frame begins with 2 bytes encoding FIN, RSV1-3, opcode, MASK, and length.
 * This test ensures the bits are extracted correctly.
 */
describe('parseHeader', () => {
  it('rfc-6455-5.2 parses FIN, RSV, opcode, MASK, and length correctly', () => {
    const byte0 = 0b10110001; // FIN=1, RSV1=0, RSV2=1, RSV3=1, opcode=0001 (TEXT)
    const byte1 = 0b10011111; // MASK=1, length=31

    const buffer = Buffer.from([byte0, byte1]);
    const result = parseHeader(buffer, 0);

    expect(result.fin).toBe(1);
    expect(result.rsv1).toBe(0);
    expect(result.rsv2).toBe(1);
    expect(result.rsv3).toBe(1);
    expect(result.mask).toBe(1);
    expect(result.opcode).toBe(0x01); // TEXT
    expect(result.length).toBe(31);
    expect(result.extensionDataLength).toBe(0);
    expect(result.maskingKey).toBeUndefined();
  });
});
