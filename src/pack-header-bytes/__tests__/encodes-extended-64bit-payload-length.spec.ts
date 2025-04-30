import { PulseFrameHeader } from '@/types/pulse-frame-header';
import { PulseFrameOpcode } from '@/types/pulse-frame-opcode';
import { packHeaderBytes } from '..';
import { MAX_16BIT_PAYLOAD_LENGTH } from '@/types/constants';

/**
 * @spec RFC 6455 §5.2 - Framing
 *
 * Payloads larger than 65535 must use a payload indicator value of 127 (0x7F),
 * followed by 8 bytes representing the payload length.
 */
describe('packHeaderBytes', () => {
  it('rfc-6455-5.2 encodes extended 64-bit payload length', () => {
    const header = {
      fin: 1,
      rsv1: 0,
      rsv2: 0,
      rsv3: 0,
      mask: 0,
      opcode: PulseFrameOpcode.BINARY,
    } as PulseFrameHeader;

    const [byte0, byte1] = packHeaderBytes(
      header,
      MAX_16BIT_PAYLOAD_LENGTH + 1,
    );
    expect(byte0 & 0x0f).toBe(PulseFrameOpcode.BINARY);
    expect(byte1).toBe(127);
  });
});
