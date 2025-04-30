import { validateCloseFramePayload } from '..';

/**
 * @spec RFC 6455 §5.5.1
 *
 * A close frame must be either empty or contain at least 2 bytes
 * for a valid status code. A 1-byte payload is invalid.
 */
describe('validateCloseFramePayload', () => {
  it('rfc-6455-5.5.1 rejects payload length of 1', () => {
    const payload = Buffer.from([0x00]);

    expect(() => validateCloseFramePayload(payload)).toThrow(
      'Protocol error: close frame payload too small',
    );
  });
});