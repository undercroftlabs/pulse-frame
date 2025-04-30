import { createFrameFromText } from '..';
import { PulseFrameOpcode } from '@/types/pulse-frame-opcode';

/**
 * @spec RFC 6455 §5.6 - Data Frames
 *
 * Text frames must support valid UTF-8 strings including multi-byte characters.
 * This test verifies proper encoding of emojis and extended characters.
 */
describe('createFrameFromText', () => {
  it('rfc-6455-5.6 creates frame with multibyte UTF-8 characters', () => {
    const text = '🔥 WebSocket 🚀';
    const frame = createFrameFromText(text);

    expect(frame.getHeader().opcode).toBe(PulseFrameOpcode.TEXT);
    expect(frame.getPayloadString()).toBe(text);
  });
});
