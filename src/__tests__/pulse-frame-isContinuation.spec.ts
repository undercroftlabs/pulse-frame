import { PulseFrame } from '@/types/pulse-frame';
import { PulseFrameHeader } from '@/types/pulse-frame-header';
import { PulseFrameOpcode } from '@/types/pulse-frame-opcode';

/**
 * @spec RFC 6455 §5.4 - Fragmentation
 *
 * Ensures `isContinuation()` correctly identifies continuation frames
 * by checking the opcode against `0x0`.
 */
describe('PulseFrame.isContinuation', () => {
  it('returns true when opcode is CONTINUATION (0x0)', () => {
    const frame = new PulseFrame(
      {
        fin: 0,
        rsv1: 0,
        rsv2: 0,
        rsv3: 0,
        mask: 0,
        opcode: PulseFrameOpcode.CONTINUATION,
        length: 0,
        extensionDataLength: 0,
        maskingKey: undefined,
      } as PulseFrameHeader,
      Buffer.alloc(0),
    );

    expect(frame.isContinuation()).toBe(true);
  });

  it('returns false when opcode is not CONTINUATION', () => {
    const frame = new PulseFrame(
      {
        fin: 1,
        rsv1: 0,
        rsv2: 0,
        rsv3: 0,
        mask: 0,
        opcode: PulseFrameOpcode.TEXT,
        length: 0,
        extensionDataLength: 0,
        maskingKey: undefined,
      } as PulseFrameHeader,
      Buffer.alloc(0),
    );

    expect(frame.isContinuation()).toBe(false);
  });
});
