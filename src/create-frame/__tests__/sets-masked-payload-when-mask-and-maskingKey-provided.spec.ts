import { MASKING_KEY_LENGTH } from '@/types/constants';
import { createFrame } from '..';
import { PulseFrameOpcode } from '@/types/pulse-frame-opcode';

describe('createFrame', () => {
  it('masks payload when mask is 1 and maskingKey is present', () => {
    const payload = Buffer.from('Hello');
    const maskingKey = Buffer.alloc(MASKING_KEY_LENGTH, 0x01); // simple key

    const frame = createFrame({
      opcode: PulseFrameOpcode.TEXT,
      payloadData: payload,
      mask: 1,
      maskingKey,
    });

    expect(frame.getHeader().mask).toBe(1);
    expect(frame.getHeader().maskingKey).toEqual(maskingKey);
    expect(frame.getPayload()).not.toEqual(payload); // should be masked
  });
});
