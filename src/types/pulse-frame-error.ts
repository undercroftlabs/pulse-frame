/* istanbul ignore file */

/**
 * Represents a protocol error encountered while parsing or constructing
 * a WebSocket frame.
 *
 * Used to signal issues such as:
 * - Invalid opcodes
 * - Malformed payloads
 * - Invalid close codes
 * - Incomplete or truncated frames
 *
 * @extends Error
 */
export class PulseFrameError extends Error {
  /**
   * Creates a new PulseFrameError with a specific error message.
   *
   * @param message - A descriptive explanation of the framing error.
   */
  constructor(public readonly message: string) {
    super(message);
    this.name = 'PulseFrameError';
    Object.setPrototypeOf(this, PulseFrameError.prototype);
  }
}
