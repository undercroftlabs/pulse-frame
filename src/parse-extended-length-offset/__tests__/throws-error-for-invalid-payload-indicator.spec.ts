import { PulseFrameError } from '@/types/pulse-frame-error';
import { parseExtendedLengthOffset } from '..';

/**
 * @spec RFC 6455 §5.2 - Base Framing Protocol
 *
 * Payload length indicators must be 0–125, 126 (2-byte extended), or 127 (8-byte extended).
 * Any other value is invalid.
 */
describe('parseExtendedLengthOffset', () => {
  it('rfc-6455-5.2 throws for invalid payload indicator > 127', () => {
    expect(() => parseExtendedLengthOffset(128)).toThrow(PulseFrameError);
    expect(() => parseExtendedLengthOffset(128)).toThrow(
      'Invalid payload length for extended length',
    );
  });
});
