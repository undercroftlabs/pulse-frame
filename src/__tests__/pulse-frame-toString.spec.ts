import { PulseFrame } from '@/types/pulse-frame';
import { PulseFrameOpcode } from '@/types/pulse-frame-opcode';

/**
 * @spec RFC 6455 §5.2, §5.6 — Data Framing and Frame Format
 *
 * These tests verify the human-readable string output of PulseFrame,
 * which summarizes key header information for debugging/logging.
 */
describe('PulseFrame.toString', () => {
  it('returns a readable string representation of the frame', () => {
    const frame = new PulseFrame(
      {
        fin: 1,
        rsv1: 0,
        rsv2: 0,
        rsv3: 0,
        mask: 1,
        opcode: PulseFrameOpcode.TEXT,
        length: 5,
        extensionDataLength: 0,
        maskingKey: Buffer.from([0, 0, 0, 0]),
      },
      Buffer.from('hello'),
    );

    expect(frame.toString()).toBe('PulseFrame[opcode=TEXT, fin=1, length=5, masked=true]');
  });

  it('falls back to numeric opcode if not found in enum', () => {
    const frame = new PulseFrame(
      {
        fin: 1,
        rsv1: 0,
        rsv2: 0,
        rsv3: 0,
        mask: 0,
        opcode: 99 as PulseFrameOpcode, // simulate unknown opcode
        length: 3,
        extensionDataLength: 0,
        maskingKey: undefined,
      },
      Buffer.from('abc'),
    );

    expect(frame.toString()).toBe('PulseFrame[opcode=99, fin=1, length=3, masked=false]');
  });
});
