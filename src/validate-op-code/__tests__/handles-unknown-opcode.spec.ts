import { PulseFrameHeader } from '@/types/pulse-frame-header';
import { validateOpcode } from '..';

/**
 * @spec RFC 6455 §5.2 & §11.8 - Opcode Validation
 *
 * All opcodes must be recognized by the implementation or be explicitly supported
 * by negotiated extensions. Unknown opcodes are considered protocol violations.
 *
 * This test verifies that an invalid or unrecognized opcode (e.g., 255) results
 * in a protocol error being thrown.
 */
describe('validateOpcode', () => {
  it('rfc-6455-5.5 throws an error for an unknown opcode', () => {
    const header = {
      opcode: 255, // Invalid opcode
      fin: 1,
      length: 5,
    } as unknown as PulseFrameHeader;

    expect(() => validateOpcode(header)).toThrow('Invalid opcode: 255');
  });
});
