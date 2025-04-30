import { PulseFrameHeader } from '@/types/pulse-frame-header';
import { packHeaderBytes } from '..';
import { PulseFrameOpcode } from '@/types/pulse-frame-opcode';

/**
 * @spec RFC 6455 §5.5 - Control Frames
 *
 * Control frames must have FIN=1 and cannot be fragmented.
 * This test ensures that an unmasked control frame is encoded with the correct bits.
 */
describe('packHeaderBytes', () => {
  it('rfc-6455-5.5 encodes unmasked control frame', () => {
    const header = {
      fin: 1,
      rsv1: 0,
      rsv2: 0,
      rsv3: 0,
      mask: 0,
      opcode: PulseFrameOpcode.PING,
    } as PulseFrameHeader;

    const [byte0, byte1] = packHeaderBytes(header, 5);
    expect(byte0 & 0x0f).toBe(PulseFrameOpcode.PING); // Lower nibble should match opcode
    expect(byte0 >> 7).toBe(1); // FIN=1
    expect(byte1 >> 7).toBe(0); // MASK=0
    expect(byte1 & 0x7f).toBe(5); // Payload length
  });
});
