import { PulseFrameHeader } from '@/types/pulse-frame-header';
import { PulseFrameOpcode } from '@/types/pulse-frame-opcode';
import { validateOpcode } from '..';

/**
 * @spec RFC 6455 §5.5 - Control Frames and Data Frames
 *
 * This test verifies that the `validateOpcode` function accepts the BINARY opcode (0x2),
 * which is a valid non-control opcode for data frames. The `FIN` bit is set to 1 and
 * the payload is within acceptable size.
 */
describe('validateOpcode', () => {
  it('rfc-6455-5.5 allows binary opcode as a valid non-control frame', () => {
    const header: PulseFrameHeader = {
      opcode: PulseFrameOpcode.BINARY,
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
