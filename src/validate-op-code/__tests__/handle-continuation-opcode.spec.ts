import { PulseFrameHeader } from '@/types/pulse-frame-header';
import { PulseFrameOpcode } from '@/types/pulse-frame-opcode';
import { validateOpcode } from '..';

/**
 * @spec RFC 6455 §5.4 - Fragmentation & Continuation Frames
 *
 * This test ensures that the CONTINUATION opcode (0x0) is considered valid.
 * Continuation frames are used to continue a fragmented message sequence and
 * are not control frames, so they are not subject to the FIN=1 or 125-byte max restrictions.
 */
describe('validateOpcode', () => {
  it('rfc-6455-5.4 allows CONTINUATION opcode as a valid non-control frame', () => {
    const header: PulseFrameHeader = {
      opcode: PulseFrameOpcode.CONTINUATION,
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
