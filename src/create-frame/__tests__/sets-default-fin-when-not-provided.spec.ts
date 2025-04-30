import { createFrame } from '..';
import { PulseFrameOpcode } from '@/types/pulse-frame-opcode';

describe('createFrame', () => {
  it('sets default FIN to 1 when not provided', () => {
    const frame = createFrame({ opcode: PulseFrameOpcode.TEXT });
    expect(frame.getHeader().fin).toBe(1);
  });
});
