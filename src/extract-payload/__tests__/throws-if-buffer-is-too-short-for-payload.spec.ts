import { extractPayload } from '..';

/**
 * @spec RFC 6455 §5.2 - Base Framing Protocol
 *
 * If the declared payload length exceeds available data,
 * this indicates an incomplete or malformed frame.
 */
describe('extractPayload', () => {
  it('rfc-6455-5.2 throws if buffer is too short for payload', () => {
    const buffer = Buffer.from([0x00, 0x01, 0x02]);
    expect(() => extractPayload(buffer, 1, 5)).toThrow(
      'Incomplete frame: not enough bytes for payload',
    );
  });
});
