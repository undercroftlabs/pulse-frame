import { validateCloseFramePayload } from '..';

/**
 * @spec RFC 6455 §7.4.1
 *
 * Valid close codes must be ≤ 4999. Codes ≥ 5000 are invalid.
 */
describe('validateCloseFramePayload', () => {
  it('rfc-6455-7.4.1 rejects close code above 4999', () => {
    const payload = Buffer.alloc(2);
    payload.writeUInt16BE(5000, 0);

    expect(() => validateCloseFramePayload(payload)).toThrow(
      'Protocol error: invalid close code 5000',
    );
  });
});