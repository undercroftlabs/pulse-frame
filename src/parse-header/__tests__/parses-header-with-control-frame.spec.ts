import { parseHeader } from '..';
import { PulseFrameOpcode } from '@/types/pulse-frame-opcode';

/**
 * @spec RFC 6455 §5.5.2 - Control Frames (e.g., PING)
 *
 * Ensures that a PING frame is parsed with proper flags and opcode.
 */
describe('parseHeader', () => {
  it('rfc-6455-5.5.2 parses control frame with opcode PING', () => {
    const buffer = Buffer.from([0b10001001, 0b00000010]); // FIN=1, OPCODE=9 (PING), MASK=0, length=2
    const header = parseHeader(buffer, 0);

    expect(header.fin).toBe(1);
    expect(header.opcode).toBe(PulseFrameOpcode.PING);
    expect(header.mask).toBe(0);
    expect(header.length).toBe(2);
  });
});
