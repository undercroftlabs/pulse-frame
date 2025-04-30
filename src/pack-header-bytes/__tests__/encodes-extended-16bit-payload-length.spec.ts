import { PulseFrameOpcode } from '@/types/pulse-frame-opcode';
import { packHeaderBytes } from '..';
import { PulseFrameHeader } from '@/types/pulse-frame-header';

/**
 * @spec RFC 6455 §5.2 - Framing
 *
 * For payloads between 126 and 65535 bytes, the second byte of the frame header must
 * include the payload indicator value of 126 (0x7E), followed by 2 bytes of extended length.
 */
describe('packHeaderBytes', () => {
  it('rfc-6455-5.2 encodes extended 16-bit payload length', () => {
    const header = {
      fin: 1,
      rsv1: 0,
      rsv2: 0,
      rsv3: 0,
      mask: 0,
      opcode: PulseFrameOpcode.BINARY,
    } as PulseFrameHeader;

    const [byte0, byte1] = packHeaderBytes(header, 300); // > 126, < 65535
    expect(byte0 & 0x0f).toBe(PulseFrameOpcode.BINARY);
    expect(byte1).toBe(126);
  });
});
