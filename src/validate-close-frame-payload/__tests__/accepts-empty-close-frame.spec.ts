import { validateCloseFramePayload } from '..';

/**
 * @spec RFC 6455 §5.5.1
 *
 * A close frame may be completely empty (0 bytes) and still be valid.
 */
describe('validateCloseFramePayload', () => {
  it('rfc-6455-5.5.1 allows empty close frame payload', () => {
    const payload = Buffer.alloc(0);
    expect(() => validateCloseFramePayload(payload)).not.toThrow();
  });
});