import { PAYLOAD_EXTENDED_16 } from '@/types/constants';
import { readPayloadLength } from '..';
import { PulseFrameError } from '@/types/pulse-frame-error';

/**
 * @spec RFC 6455 §5.2 - Base Framing Protocol
 *
 * A length of 126 requires 2 additional bytes. This test ensures we throw
 * if they are missing.
 */
describe('readPayloadLength', () => {
  it('rfc-6455-5.2 throws if buffer is too short for 16-bit length', () => {
    const buffer = Buffer.alloc(1); // should be 2 bytes
    expect(() =>
      readPayloadLength(buffer, PAYLOAD_EXTENDED_16, 0),
    ).toThrow(PulseFrameError);
  });
});
