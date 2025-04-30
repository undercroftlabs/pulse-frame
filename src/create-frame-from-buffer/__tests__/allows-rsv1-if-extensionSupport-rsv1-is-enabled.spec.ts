/**
 * @spec RFC 6455 §5.5 - Reserved Bits and Extensions
 *
 * If `extensionSupport` explicitly declares support for a reserved bit,
 * the corresponding RSV bit in the frame should be accepted.
 */

import { createFrameFromBuffer } from '..';
import { PulseFrameOpcode } from '@/types/pulse-frame-opcode';

describe('createFrameFromBuffer', () => {
  it('rfc-6455-5.5 allows RSV1 if extensionSupport.rsv1 = true', () => {
    const payload = Buffer.from('test');
    const header = Buffer.from([0b11000001, payload.length]); // FIN=1, RSV1=1, OPCODE=1 (TEXT)

    const buffer = Buffer.concat([header, payload]);

    const frame = createFrameFromBuffer(buffer, {
      extensionSupport: { rsv1: true, rsv2: false, rsv3: false },
    });

    expect(frame.getHeader().rsv1).toBe(1);
    expect(frame.getHeader().opcode).toBe(PulseFrameOpcode.TEXT);
    expect(frame.getPayloadString()).toBe('test');
  });
});
