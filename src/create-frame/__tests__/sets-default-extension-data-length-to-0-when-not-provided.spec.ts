import { createFrame } from '..';
import { PulseFrameOpcode } from '@/types/pulse-frame-opcode';

describe('createFrame', () => {
  it('sets extensionDataLength to 0 when not provided', () => {
    const frame = createFrame({ opcode: PulseFrameOpcode.TEXT });
    expect(frame.getHeader().extensionDataLength).toBe(0);
  });
});
