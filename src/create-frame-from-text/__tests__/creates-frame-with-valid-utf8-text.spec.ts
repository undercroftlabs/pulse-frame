import { createFrameFromText } from '..';
import { PulseFrameOpcode } from '@/types/pulse-frame-opcode';

/**
 * @spec RFC 6455 §5.6 - Data Frames
 *
 * Text frames must contain valid UTF-8 encoded payloads.
 * This test ensures a standard text string is encoded correctly.
 */
describe('createFrameFromText', () => {
  it('rfc-6455-5.6 creates frame with valid UTF-8 text', () => {
    const text = 'Hello, Pulse!';
    const frame = createFrameFromText(text);

    expect(frame.getHeader().opcode).toBe(PulseFrameOpcode.TEXT);
    expect(frame.getHeader().length).toBe(Buffer.byteLength(text, 'utf8'));
    expect(frame.getPayloadString()).toBe(text);
  });
});
