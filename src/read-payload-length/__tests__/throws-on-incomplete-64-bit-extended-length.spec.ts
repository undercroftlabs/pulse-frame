import { PAYLOAD_EXTENDED_64 } from '@/types/constants';
import { readPayloadLength } from '..';
import { PulseFrameError } from '@/types/pulse-frame-error';

/**
 * @spec RFC 6455 §5.2 - Base Framing Protocol
 *
 * A length of 127 requires 8 additional bytes. This test ensures we throw
 * if they are missing.
 */
describe('readPayloadLength', () => {
  it('rfc-6455-5.2 throws if buffer is too short for 64-bit length', () => {
    const buffer = Buffer.alloc(7); // should be 8 bytes
    expect(() => readPayloadLength(buffer, PAYLOAD_EXTENDED_64, 0)).toThrow(
      PulseFrameError,
    );
  });
});
