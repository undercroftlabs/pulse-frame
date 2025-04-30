import { validateCloseFramePayload } from '..';

/**
 * @spec RFC 6455 §7.4.1
 *
 * Valid close codes must be between 1000 and 4999. Codes < 1000 are reserved.
 */
describe('validateCloseFramePayload', () => {
  it('rfc-6455-7.4.1 rejects close code below 1000', () => {
    const payload = Buffer.alloc(2);
    payload.writeUInt16BE(999, 0);

    expect(() => validateCloseFramePayload(payload)).toThrow(
      'Protocol error: invalid close code 999',
    );
  });
});