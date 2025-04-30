import { createFrameFromControlCode } from '..';
import { PulseFrameOpcode } from '@/types/pulse-frame-opcode';

/**
 * @spec RFC 6455 §5.5 - Control Frames
 *
 * Control frames (e.g., PING, PONG, CLOSE) must not exceed 125 bytes.
 * This test ensures a control frame with a valid payload is created correctly.
 */
describe('createFrameFromControlCode', () => {
  it('rfc-6455-5.5 creates frame with valid control payload', () => {
    const payload = Buffer.from('pong');
    const frame = createFrameFromControlCode(payload, PulseFrameOpcode.PONG);

    expect(frame.getHeader().opcode).toBe(PulseFrameOpcode.PONG);
    expect(frame.getHeader().length).toBe(payload.length);
    expect(frame.getPayload()).toEqual(payload);
  });
});