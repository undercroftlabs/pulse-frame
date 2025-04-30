import { createFrame } from '..';
import { PulseFrameOpcode } from '@/types/pulse-frame-opcode';

describe('createFrame', () => {
  it('uses extensionData if provided', () => {
    const extensionData = Buffer.from([0xde, 0xad]);

    const frame = createFrame({
      opcode: PulseFrameOpcode.TEXT,
      payloadData: Buffer.from('data'),
      extensionData,
      extensionDataLength: extensionData.length,
    });

    expect(frame.getExtensionData()).toEqual(extensionData);
    expect(frame.getHeader().extensionDataLength).toBe(extensionData.length);
  });
});
