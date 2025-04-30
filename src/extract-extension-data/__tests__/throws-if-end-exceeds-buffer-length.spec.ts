import { PulseFrameError } from '@/types/pulse-frame-error';
import { extractExtensionData } from '..';

/**
 * @spec RFC 6455 §5.2 - Base Framing Protocol
 *
 * Extension data must be present in full if the length is non-zero.
 * This test ensures an error is thrown if the declared length exceeds the actual buffer.
 */
describe('extractExtensionData', () => {
  it('rfc-6455-5.2 throws if end offset exceeds buffer length', () => {
    const buffer = Buffer.from('12345678');
    expect(() => extractExtensionData(buffer, 5, 5)).toThrow(PulseFrameError);
  });
});
