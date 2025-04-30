import { PulseFrame } from '@/types/pulse-frame';
import { PulseFrameHeader } from '@/types/pulse-frame-header';

/**
 * @spec RFC 6455 §5.2 - Base Framing Protocol
 *
 * The FIN bit indicates that this is the final fragment in a message.
 * These tests verify that `isFinal()` accurately reflects the FIN bit.
 */
describe('PulseFrame.isFinal', () => {
  it('returns true when FIN is 1 (final fragment)', () => {
    const frame = new PulseFrame(
      {
        fin: 1,
        rsv1: 0,
        rsv2: 0,
        rsv3: 0,
        mask: 0,
        opcode: 1,
        length: 0,
        extensionDataLength: 0,
        maskingKey: undefined,
      } as PulseFrameHeader,
      Buffer.alloc(0),
    );

    expect(frame.isFinal()).toBe(true);
  });

  it('returns false when FIN is 0 (fragmented frame)', () => {
    const frame = new PulseFrame(
      {
        fin: 0,
        rsv1: 0,
        rsv2: 0,
        rsv3: 0,
        mask: 0,
        opcode: 1,
        length: 0,
        extensionDataLength: 0,
        maskingKey: undefined,
      } as PulseFrameHeader,
      Buffer.alloc(0),
    );

    expect(frame.isFinal()).toBe(false);
  });
});
