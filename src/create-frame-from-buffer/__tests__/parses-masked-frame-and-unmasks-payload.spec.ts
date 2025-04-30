import { createFrameFromBuffer } from '..';
import { maskPayload } from '@/mask-payload';

/**
 * @test rfc-6455-5.3 parses masked payload correctly
 */
describe('createFrameFromBuffer', () => {
  it('rfc-6455-5.3 parses masked frame and unmasks payload', () => {
    const rawPayload = Buffer.from('Hi');
    const maskingKey = Buffer.from([0xaa, 0xbb, 0xcc, 0xdd]);
    const masked = maskPayload(rawPayload, maskingKey);

    const header = Buffer.alloc(2);
    header[0] = 0x81; // FIN=1, opcode=1
    header[1] = 0x80 | masked.length; // MASK=1, length=2

    const buffer = Buffer.concat([header, maskingKey, masked]);

    const frame = createFrameFromBuffer(buffer);

    expect(frame.getPayloadString()).toBe('Hi');
    expect(frame.getHeader().mask).toBe(1);
    expect(frame.getHeader().maskingKey?.equals(maskingKey)).toBe(true);
  });
});
