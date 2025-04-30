import {
  PAYLOAD_EXTENDED_64,
  EXTENDED_LENGTH_64_BYTES,
} from '@/types/constants';
import { parseExtendedLengthOffset } from '..';

/**
 * @spec RFC 6455 §5.2 - Base Framing Protocol
 *
 * Payload length of 127 uses an 8-byte extended length field.
 */
describe('parseExtendedLengthOffset', () => {
  it('rfc-6455-5.2 returns 8-byte offset for payload length 127', () => {
    expect(parseExtendedLengthOffset(PAYLOAD_EXTENDED_64)).toBe(
      EXTENDED_LENGTH_64_BYTES,
    );
  });
});
