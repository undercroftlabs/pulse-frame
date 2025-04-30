/**
 * @spec RFC 6455 §5.2 - Base Framing Protocol
 *
 * Payload lengths must be in one of the valid categories: < 126, 126, or 127.
 * Any other number should throw.
 */
import { readPayloadLength } from '..';
import { PulseFrameError } from '@/types/pulse-frame-error';

describe('readPayloadLength', () => {
  it('rfc-6455-5.2 throws if payload length is invalid', () => {
    const buffer = Buffer.alloc(0);
    expect(() => readPayloadLength(buffer, 999, 0)).toThrow(PulseFrameError);
  });
});
