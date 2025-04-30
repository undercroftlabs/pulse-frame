import { PAYLOAD_EXTENDED_16 } from '@/types/constants';
import { parseExtendedLengthOffset } from '..';

/**
 * @spec RFC 6455 §5.2 - Base Framing Protocol
 *
 * Payload lengths below 126 are encoded directly in the second byte with no extended length bytes.
 */
describe('parseExtendedLengthOffset', () => {
  it('rfc-6455-5.2 returns 0 offset for payload < 126', () => {
    expect(parseExtendedLengthOffset(PAYLOAD_EXTENDED_16 - 1)).toBe(0);
  });
});
