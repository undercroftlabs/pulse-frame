import { parseHeader } from '..';

/**
 * @spec RFC 6455 §5.2 - RSV Bits
 *
 * Tests that RSV1, RSV2, and RSV3 bits are correctly extracted from the frame header.
 * These are normally used by negotiated extensions.
 */
describe('parseHeader', () => {
  it('rfc-6455-5.2 parses reserved bits RSV1, RSV2, RSV3 correctly', () => {
    const buffer = Buffer.from([0b11111100, 0b00000010]); // FIN=1, RSV1=1, RSV2=1, RSV3=1, OPCODE=12
    const header = parseHeader(buffer, 0);

    expect(header.rsv1).toBe(1);
    expect(header.rsv2).toBe(1);
    expect(header.rsv3).toBe(1);
    expect(header.opcode).toBe(0x0c);
  });
});
