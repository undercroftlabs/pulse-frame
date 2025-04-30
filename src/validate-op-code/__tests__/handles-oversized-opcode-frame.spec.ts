import { PulseFrameHeader } from '@/types/pulse-frame-header';
import { validateOpcode } from '..';
import {
  OPCODE_CONTROL_THRESHOLD,
  MAX_CONTROL_FRAME_PAYLOAD,
} from '@/types/constants';

/**
 * @spec RFC 6455 §5.5 - Control Frames
 *
 * Control frames (e.g., PING, PONG, CLOSE) must not have payloads larger than 125 bytes.
 *
 * This test verifies that a control frame with a payload length exceeding 125 bytes
 * throws a protocol error as required by the specification.
 */
describe('validateOpcode', () => {
  it('rfc-6455-5.5 throws an error if a control frame payload is too large', () => {
    const header = {
      opcode: OPCODE_CONTROL_THRESHOLD,
      fin: 1,
      length: MAX_CONTROL_FRAME_PAYLOAD + 1, // exceeds 125
    } as PulseFrameHeader;

    expect(() => validateOpcode(header)).toThrow(
      'Control frame payload too long',
    );
  });
});
