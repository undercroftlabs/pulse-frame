import { PulseFrame } from '@/types/pulse-frame';
import { PulseFrameOpcode } from '@/types/pulse-frame-opcode';

/**
 * @spec Internal API - Frame Metadata
 *
 * Verifies that `getOpcode()` correctly returns the opcode from the header.
 * This is essential for dispatching logic based on frame type (e.g., text, binary, ping).
 */
describe('PulseFrame.getOpcode', () => {
  it('returns the correct opcode from the header', () => {
    const frame = new PulseFrame(
      {
        fin: 1,
        rsv1: 0,
        rsv2: 0,
        rsv3: 0,
        mask: 0,
        opcode: PulseFrameOpcode.BINARY,
        length: 0,
        extensionDataLength: 0,
        maskingKey: undefined,
      },
      Buffer.alloc(0),
    );

    expect(frame.getOpcode()).toBe(PulseFrameOpcode.BINARY);
  });
});
