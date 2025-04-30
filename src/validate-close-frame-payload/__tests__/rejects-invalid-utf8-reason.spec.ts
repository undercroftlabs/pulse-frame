import { validateCloseFramePayload } from '..';

/**
 * @spec RFC 6455 §5.5.1
 *
 * If a close reason string is provided, it must be valid UTF-8.
 */
describe('validateCloseFramePayload', () => {
  it('rfc-6455-5.5.1 rejects invalid UTF-8 in reason string', () => {
    const reason = Buffer.from([0xff, 0xfe]); // Invalid UTF-8
    const payload = Buffer.concat([Buffer.from([0x03, 0xe8]), reason]); // 1000 + reason

    expect(() => validateCloseFramePayload(payload)).toThrow(
      'Protocol error: invalid UTF-8 in close reason',
    );
  });
});