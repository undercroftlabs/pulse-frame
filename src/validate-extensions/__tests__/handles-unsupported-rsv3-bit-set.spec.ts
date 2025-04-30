import { PulseFrameExtensionSupport } from '@/types/pulse-frame-extension-support';
import { PulseFrameHeader } from '@/types/pulse-frame-header';
import { PulseFrameOpcode } from '@/types/pulse-frame-opcode';
import { PulseFrameOptions } from '@/types/pulse-frame-options';
import { validateExtensions } from '..';

/**
 * @spec RFC 6455 §5.2 - Base Framing Protocol
 *
 * RSV3 is reserved and must be 0 unless negotiated by an extension.
 *
 * This test verifies that when RSV3 is set in the frame header, but no
 * extension claims support for it, the validator throws an error as required
 * by the protocol.
 */
describe('validateExtensions', () => {
  it('rfc-6455-5.2 rsv3=1 unsupported', () => {
    const header: PulseFrameHeader = {
      fin: 1,
      rsv1: 0,
      rsv2: 0,
      rsv3: 1,
      mask: 0,
      opcode: PulseFrameOpcode.TEXT,
      length: 1,
      extensionDataLength: 0,
      maskingKey: Buffer.from([0, 0, 0, 0]),
    };

    const extensionSupport: PulseFrameExtensionSupport = {
      rsv1: false,
      rsv2: false,
      rsv3: false,
    };

    expect(() => validateExtensions(header, extensionSupport)).toThrow(
      'RSV3 is set but not supported by any extension',
    );
  });
});
