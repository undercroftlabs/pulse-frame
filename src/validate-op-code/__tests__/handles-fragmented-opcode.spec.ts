import { PulseFrameHeader } from '@/types/pulse-frame-header';
import { validateOpcode } from '..';
import { OPCODE_CONTROL_THRESHOLD } from '@/types/constants';

/**
 * @spec RFC 6455 §5.5 - Control Frames
 *
 * Control frames (e.g. PING, PONG, CLOSE) must not be fragmented,
 * meaning the FIN bit must always be set to 1.
 *
 * This test verifies that a control frame with `fin = 0` triggers a protocol error,
 * as fragmentation is explicitly disallowed for control opcodes.
 */
describe('validateOpcode', () => {
  it('rfc-6455-5.5 throws an error if a control frame is fragmented (fin !== 1)', () => {
    const header = {
      opcode: OPCODE_CONTROL_THRESHOLD, // control opcodes start here
      fin: 0, // invalid: fragmentation is not allowed
      length: 5,
    } as PulseFrameHeader;

    expect(() => validateOpcode(header)).toThrow(
      'Protocol error: control frames must not be fragmented (FIN=1)',
    );
  });
});
