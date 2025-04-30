import { createFrameFromControlCode } from '..';
import { PulseFrameOpcode } from '@/types/pulse-frame-opcode';
import { PulseFrameError } from '@/types/pulse-frame-error';

/**
 * @spec RFC 6455 §5.5 - Control Frames
 *
 * Control frames must not exceed 125 bytes. This test verifies that the function throws an error
 * if this limit is violated.
 */
describe('createFrameFromControlCode', () => {
  it('rfc-6455-5.5 throws if control payload is too large', () => {
    const largePayload = Buffer.alloc(126); // Exceeds max size for control frame

    expect(() =>
      createFrameFromControlCode(largePayload, PulseFrameOpcode.PING),
    ).toThrow(PulseFrameError);
  });
});
