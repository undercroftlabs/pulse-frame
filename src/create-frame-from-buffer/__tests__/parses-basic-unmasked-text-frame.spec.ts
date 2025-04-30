import { createFrameFromBuffer } from '..';
import { PulseFrameOpcode } from '@/types/pulse-frame-opcode';

/**
 * @test rfc-6455-5.2 parses a basic unmasked text frame correctly
 */
describe('createFrameFromBuffer', () => {
  it('rfc-6455-5.2 parses basic unmasked text frame', () => {
    const payload = Buffer.from('Hello');
    const frameLength = payload.length;
    const header = Buffer.alloc(2);
    header[0] = 0x81; // FIN=1, RSV=0, opcode=1 (text)
    header[1] = frameLength; // MASK=0, length=payload.length

    const buffer = Buffer.concat([header, payload]);
    const frame = createFrameFromBuffer(buffer);

    expect(frame.getHeader().fin).toBe(1);
    expect(frame.getHeader().opcode).toBe(PulseFrameOpcode.TEXT);
    expect(frame.getPayloadString()).toBe('Hello');
  });
});
