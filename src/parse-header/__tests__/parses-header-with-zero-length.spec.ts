import { parseHeader } from '..';

/**
 * @spec RFC 6455 §5.2 - Base Framing Protocol
 *
 * Verifies that parseHeader can correctly interpret a frame with zero-length payload.
 * This occurs when the payload length field contains 0 and no other modifiers are present.
 */
describe('parseHeader', () => {
  it('rfc-6455-5.2 parses frame with zero-length payload', () => {
    const buffer = Buffer.from([0b10000001, 0b00000000]); // FIN=1, OPCODE=1 (TEXT), MASK=0, length=0
    const header = parseHeader(buffer, 0);

    expect(header.fin).toBe(1);
    expect(header.opcode).toBe(0x1);
    expect(header.mask).toBe(0);
    expect(header.length).toBe(0);
    expect(header.extensionDataLength).toBe(0);
  });
});
