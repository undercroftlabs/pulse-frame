import { PulseFrameHeader } from '@/types/pulse-frame-header';
import { PulseFrameOpcode } from '@/types/pulse-frame-opcode';
import { validateOpcode } from '..';

/**
 * @spec RFC 6455 §5.5.1 - Close Frame
 *
 * This test verifies that the `validateOpcode` function allows the CLOSE opcode (0x8),
 * which is a valid control frame. Control frames must not be fragmented (FIN = 1)
 * and must have a payload length of 125 bytes or fewer.
 */
describe('validateOpcode', () => {
  it('rfc-6455-5.5.1 allows CLOSE opcode as valid control frame', () => {
    const header: PulseFrameHeader = {
      opcode: PulseFrameOpcode.CLOSE,
      fin: 1,
      rsv1: 0,
      rsv2: 0,
      rsv3: 0,
      mask: 0,
      length: 5,
      extensionDataLength: 0,
      maskingKey: undefined,
    };

    expect(() => validateOpcode(header)).not.toThrow();
  });
});
