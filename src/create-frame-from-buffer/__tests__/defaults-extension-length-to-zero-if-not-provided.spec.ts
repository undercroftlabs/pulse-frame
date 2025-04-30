/**
 * @behavior Uses extension length of 0 when options are not provided
 *
 * If no options are passed, `createFrameFromBuffer` should assume no extensions.
 * This test ensures it still parses a valid frame when the extension length is not explicitly provided.
 */

import { createFrameFromBuffer } from '..';

describe('createFrameFromBuffer', () => {
  it('defaults-extension-length-to-zero-if-not-provided', () => {
    const payload = Buffer.from('Hi');
    const header = Buffer.from([0x81, payload.length]); // FIN=1, TEXT frame, unmasked
    const buffer = Buffer.concat([header, payload]);

    const frame = createFrameFromBuffer(buffer);

    expect(frame.getPayloadString()).toBe('Hi');
    expect(frame.getHeader().extensionDataLength).toBe(0);
  });
});
