import { PulseFrame } from '@/types/pulse-frame';
import { PulseFrameOpcode } from '@/types/pulse-frame-opcode';
import { PulseFrameHeader } from '@/types/pulse-frame-header';

/**
 * @spec RFC 6455 §5.6 - Data Frames and Control Frames
 *
 * Ensures `isData()` returns true for TEXT and BINARY frames,
 * and false for control frames like CLOSE.
 */
describe('PulseFrame.isData', () => {
  it('returns true if the frame is a TEXT frame', () => {
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

    expect(frame.isData()).toBe(true);
  });

  it('returns true if the frame is a BINARY frame', () => {
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
      } as PulseFrameHeader,
      Buffer.alloc(0),
    );

    expect(frame.isData()).toBe(true);
  });

  it('returns false if the frame is a control frame (e.g., CLOSE)', () => {
    const frame = new PulseFrame(
      {
        fin: 1,
        rsv1: 0,
        rsv2: 0,
        rsv3: 0,
        mask: 0,
        opcode: PulseFrameOpcode.CLOSE,
        length: 0,
        extensionDataLength: 0,
        maskingKey: undefined,
      } as PulseFrameHeader,
      Buffer.alloc(0),
    );

    expect(frame.isData()).toBe(false);
  });
});
