import { createFrameFromBuffer } from '..';
import { PulseFrameError } from '@/types/pulse-frame-error';

/**
 * @spec RFC 6455 §5.2 - Base Framing Protocol
 *
 * A valid WebSocket frame must begin with at least two bytes of header.
 * This test ensures that `createFrameFromBuffer` throws an error if the buffer is too short.
 */
describe('createFrameFromBuffer', () => {
  it('rfc-6455-5.2 throws if buffer is smaller than header base length', () => {
    const buffer = Buffer.from([0x81]); // only 1 byte, not enough for header

    expect(() => createFrameFromBuffer(buffer)).toThrow(
      new PulseFrameError('Incomplete frame: missing first two bytes'),
    );
  });
});
