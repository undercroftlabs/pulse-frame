import { createFrameFromText } from '..';
import { PulseFrameOpcode } from '@/types/pulse-frame-opcode';

/**
 * @spec RFC 6455 §5.6 - Data Frames
 *
 * Empty text frames are valid and should result in zero-length payloads.
 */
describe('createFrameFromText', () => {
  it('rfc-6455-5.6 creates frame from empty string', () => {
    const frame = createFrameFromText('');

    expect(frame.getHeader().opcode).toBe(PulseFrameOpcode.TEXT);
    expect(frame.getHeader().length).toBe(0);
    expect(frame.getPayload()).toEqual(Buffer.alloc(0));
  });
});
