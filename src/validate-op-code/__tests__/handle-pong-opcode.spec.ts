import { PulseFrameHeader } from '@/types/pulse-frame-header';
import { PulseFrameOpcode } from '@/types/pulse-frame-opcode';
import { validateOpcode } from '..';

/**
 * @spec RFC 6455 §5.5.3 - Pong Control Frame
 *
 * This test ensures that the PONG opcode (0xA) is accepted when:
 * - FIN is set to 1 (control frames must not be fragmented).
 * - Payload length does not exceed 125 bytes.
 */
describe('validateOpcode', () => {
    it('rfc-6455-5.5.3 allows valid PONG control frame', () => {
      const header: PulseFrameHeader = {
        opcode: PulseFrameOpcode.PONG,
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