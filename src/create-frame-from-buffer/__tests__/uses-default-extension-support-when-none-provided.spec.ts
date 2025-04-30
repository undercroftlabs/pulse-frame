/**
 * @spec RFC 6455 §5.5 - Control Frames and Reserved Bits
 *
 * When no extension support is provided, all RSV bits should be considered unsupported.
 * This test ensures that default extension support is correctly applied and validation
 * fails if an RSV bit is set without declaring support.
 */

import { createFrameFromBuffer } from '..';
import { PulseFrameError } from '@/types/pulse-frame-error';

describe('createFrameFromBuffer', () => {
  it('rfc-6455-5.5 uses default extension support when none provided', () => {
    const buffer = Buffer.from([0b11000001, 0b00000000]); // FIN=1, RSV1=1 (unsupported), OPCODE=1, MASK=0, length=0

    expect(() => createFrameFromBuffer(buffer)).toThrow(
      new PulseFrameError('RSV1 is set but not supported by any extension'),
    );
  });
});
