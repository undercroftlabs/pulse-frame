import { createFrameFromControlCode } from '..';
import { PulseFrameOpcode } from '@/types/pulse-frame-opcode';

/**
 * @spec RFC 6455 §5.5 - Control Frames
 *
 * If no payload is provided, an empty control frame should still be valid.
 */
describe('createFrameFromControlCode', () => {
  it('rfc-6455-5.5 creates empty control frame if payload is undefined', () => {
    const frame = createFrameFromControlCode(undefined, PulseFrameOpcode.CLOSE);

    expect(frame.getHeader().opcode).toBe(PulseFrameOpcode.CLOSE);
    expect(frame.getHeader().length).toBe(0);
    expect(frame.getPayload()).toEqual(Buffer.alloc(0));
  });
});
