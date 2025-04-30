import { createFrame } from '..';
import { PulseFrameOpcode } from '@/types/pulse-frame-opcode';

describe('createFrame', () => {
  it('uses empty Buffer if payloadData is not provided', () => {
    const frame = createFrame({ opcode: PulseFrameOpcode.TEXT });
    expect(frame.getPayload()).toEqual(Buffer.alloc(0));
    expect(frame.getHeader().length).toBe(0);
  });
});
