/**
 * @spec RFC 6455 §5.5 - Reserved Bits and Extensions
 *
 * If `extensionSupport.rsv3` is enabled, RSV3 may be set in the frame header.
 */

import { createFrameFromBuffer } from '..';

describe('createFrameFromBuffer', () => {
  it('rfc-6455-5.5 allows RSV3 if extensionSupport.rsv3 = true', () => {
    const payload = Buffer.from('msg');
    const header = Buffer.from([0b10010001, payload.length]); // FIN=1, RSV3=1, OPCODE=1 (TEXT)

    const buffer = Buffer.concat([header, payload]);

    const frame = createFrameFromBuffer(buffer, {
      extensionSupport: { rsv1: false, rsv2: false, rsv3: true },
    });

    expect(frame.getHeader().rsv3).toBe(1);
    expect(frame.getPayloadString()).toBe('msg');
  });
});
