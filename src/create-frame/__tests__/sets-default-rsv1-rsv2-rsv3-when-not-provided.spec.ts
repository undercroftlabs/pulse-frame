import { createFrame } from '..';
import { PulseFrameOpcode } from '@/types/pulse-frame-opcode';

describe('createFrame', () => {
  it('sets RSV1/RSV2/RSV3 to 0 when not provided', () => {
    const frame = createFrame({ opcode: PulseFrameOpcode.TEXT });
    const header = frame.getHeader();
    expect(header.rsv1).toBe(0);
    expect(header.rsv2).toBe(0);
    expect(header.rsv3).toBe(0);
  });
});
