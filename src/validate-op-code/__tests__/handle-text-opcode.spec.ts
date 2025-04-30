import { PulseFrameHeader } from '@/types/pulse-frame-header';
import { PulseFrameOpcode } from '@/types/pulse-frame-opcode';
import { validateOpcode } from '..';

/**
 * @spec RFC 6455 §5.6 - Data Frames
 *
 * This test ensures that the TEXT opcode (0x1) is accepted when:
 * - FIN is set to 1 (final fragment or unfragmented message).
 * - Payload length is within valid range.
 *
 * Text frames are used to send UTF-8-encoded text data over WebSocket.
 */
describe('validateOpcode', () => {
  it('rfc-6455-5.6 allows valid TEXT data frame', () => {
    const header: PulseFrameHeader = {
      opcode: PulseFrameOpcode.TEXT,
      fin: 1,
      rsv1: 0,
      rsv2: 0,
      rsv3: 0,
      mask: 0,
      length: 5,
      extensionDataLength: 0,
      maskingKey: undefined,
    };

    expect(() => validateOpcode(header)).not.toThrow();
  });
});
