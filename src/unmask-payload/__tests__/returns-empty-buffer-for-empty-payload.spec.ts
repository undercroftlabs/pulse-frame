/**
 * @spec RFC 6455 §5.3 - Data Framing
 *
 * A frame with zero-length payload should result in an empty unmasked buffer.
 */
import { unmaskPayload } from '..';

describe('unmaskPayload', () => {
  it('rfc-6455-5.3 returns empty buffer for empty payload', () => {
    const unmasked = unmaskPayload(Buffer.alloc(0), Buffer.from([0xaa, 0xbb, 0xcc, 0xdd]));
    expect(unmasked.length).toBe(0);
  });
});
