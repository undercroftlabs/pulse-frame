import { createFrame } from '..';
import { PulseFrameOpcode } from '@/types/pulse-frame-opcode';

describe('createFrame', () => {
  it('sets mask to 0 when not provided', () => {
    const frame = createFrame({ opcode: PulseFrameOpcode.TEXT });
    expect(frame.getHeader().mask).toBe(0);
  });
});
