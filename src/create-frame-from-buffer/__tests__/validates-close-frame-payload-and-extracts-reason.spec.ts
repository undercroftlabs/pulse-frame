import { createFrameFromBuffer } from '..';
import { PulseFrameOpcode } from '@/types/pulse-frame-opcode';

/**
 * @test rfc-6455-5.5 validates close frame with valid code
 */
describe('createFrameFromBuffer', () => {
  it('rfc-6455-5.5 validates close frame payload and extracts reason', () => {
    const closeCode = Buffer.alloc(2);
    closeCode.writeUInt16BE(1000, 0); // Normal closure
    const payload = Buffer.concat([closeCode, Buffer.from('Goodbye')]);
    const header = Buffer.from([0x88, payload.length]); // FIN + CLOSE opcode, MASK=0

    const buffer = Buffer.concat([header, payload]);
    const frame = createFrameFromBuffer(buffer);

    expect(frame.getHeader().opcode).toBe(PulseFrameOpcode.CLOSE);
    expect(frame.getPayload().subarray(0, 2).readUInt16BE(0)).toBe(1000);
    expect(frame.getPayload().subarray(2).toString('utf-8')).toBe('Goodbye');
  });
});
