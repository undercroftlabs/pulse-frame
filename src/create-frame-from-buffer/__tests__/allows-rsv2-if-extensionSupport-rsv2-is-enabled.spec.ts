/**
 * @spec RFC 6455 §5.5 - Reserved Bits and Extensions
 *
 * If `extensionSupport.rsv2` is enabled, RSV2 may be set in the frame header.
 */

import { createFrameFromBuffer } from '..';

describe('createFrameFromBuffer', () => {
  it('rfc-6455-5.5 allows RSV2 if extensionSupport.rsv2 = true', () => {
    const payload = Buffer.from('data');
    const header = Buffer.from([0b10100001, payload.length]); // FIN=1, RSV2=1, OPCODE=1 (TEXT)

    const buffer = Buffer.concat([header, payload]);

    const frame = createFrameFromBuffer(buffer, {
      extensionSupport: { rsv1: false, rsv2: true, rsv3: false },
    });

    expect(frame.getHeader().rsv2).toBe(1);
    expect(frame.getPayloadString()).toBe('data');
  });
});
