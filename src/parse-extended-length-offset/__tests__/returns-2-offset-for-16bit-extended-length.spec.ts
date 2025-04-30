import {
  PAYLOAD_EXTENDED_16,
  EXTENDED_LENGTH_16_BYTES,
} from '@/types/constants';
import { parseExtendedLengthOffset } from '..';

/**
 * @spec RFC 6455 §5.2 - Base Framing Protocol
 *
 * Payload length of exactly 126 uses a 2-byte extended length field.
 */
describe('parseExtendedLengthOffset', () => {
  it('rfc-6455-5.2 returns 2-byte offset for payload length 126', () => {
    expect(parseExtendedLengthOffset(PAYLOAD_EXTENDED_16)).toBe(
      EXTENDED_LENGTH_16_BYTES,
    );
  });
});
