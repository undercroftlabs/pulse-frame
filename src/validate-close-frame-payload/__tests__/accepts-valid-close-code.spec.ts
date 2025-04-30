import { validateCloseFramePayload } from '..';

/**
 * @spec RFC 6455 §5.5.1, §7.4.1
 *
 * A close frame containing only a valid 2-byte close code
 * is considered valid and should not throw.
 */
describe('validateCloseFramePayload', () => {
  it('rfc-6455-5.5.1 accepts valid 2-byte close code without reason', () => {
    const payload = Buffer.alloc(2);
    payload.writeUInt16BE(1000, 0); // Normal closure

    expect(() => validateCloseFramePayload(payload)).not.toThrow();
  });
});