import { PulseFrameError } from '../types/pulse-frame-error';

/**
 * @spec Internal - PulseFrameError Constructor
 *
 * Ensures the custom error class correctly sets its name and prototype chain.
 */
describe('PulseFrameError', () => {
  it('initializes with message and correct name', () => {
    const error = new PulseFrameError('Frame parsing failed');

    expect(error).toBeInstanceOf(PulseFrameError);
    expect(error).toBeInstanceOf(Error);
    expect(error.message).toBe('Frame parsing failed');
    expect(error.name).toBe('PulseFrameError');
    expect(Object.getPrototypeOf(error)).toBe(PulseFrameError.prototype);
  });
});
