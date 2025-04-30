import { PulseFrameExtensionSupport } from '@/types/pulse-frame-extension-support';
import { PulseFrameHeader } from '@/types/pulse-frame-header';
import { PulseFrameOpcode } from '@/types/pulse-frame-opcode';
import { PulseFrameOptions } from '@/types/pulse-frame-options';
import { validateExtensions } from '..';

/**
 * @spec RFC 6455 §5.2 - Base Framing Protocol
 *
 * RSV1, RSV2, and RSV3 are reserved bits in the WebSocket frame header. When no extensions
 * are in use, these bits must be unset (i.e., 0). This test verifies that when all RSV bits
 * are unset and no extensions are declared as supported, the validation passes.
 *
 * This ensures the implementation correctly handles frames without extensions,
 * adhering to the default framing behavior described in RFC 6455 §5.2.
 */
describe('validateExtensions', () => {
  it('rfc-6455-5.2 rsv1=0, rsv2=0, rsv3=0', () => {
    const header: PulseFrameHeader = {
      fin: 1,
      rsv1: 0,
      rsv2: 0,
      rsv3: 0,
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

    expect(() => validateExtensions(header, extensionSupport)).not.toThrow();
  });
});
