import { PulseFrameExtensionSupport } from '@/types/pulse-frame-extension-support';
import { PulseFrameHeader } from '@/types/pulse-frame-header';
import { PulseFrameOpcode } from '@/types/pulse-frame-opcode';
import { PulseFrameOptions } from '@/types/pulse-frame-options';
import { validateExtensions } from '..';

/**
 * @spec RFC 6455 §5.2 - Base Framing Protocol
 *
 * RSV2 is a reserved bit in the WebSocket frame header and must be interpreted
 * as "must be zero" unless a negotiated extension explicitly supports its use.
 *
 * This test ensures that when RSV2 is set to 1 in the frame and the extension
 * configuration explicitly supports RSV2, validation succeeds.
 */
describe('validateExtensions', () => {
  it('rfc-6455-5.2 rsv2=1 supported', () => {
    const header: PulseFrameHeader = {
      fin: 1,
      rsv1: 0,
      rsv2: 1,
      rsv3: 0,
      mask: 0,
      opcode: PulseFrameOpcode.TEXT,
      length: 1,
      extensionDataLength: 0,
      maskingKey: Buffer.from([0, 0, 0, 0]),
    };

    const extensionSupport: PulseFrameExtensionSupport = {
      rsv1: false,
      rsv2: true,
      rsv3: false,
    };

    expect(() => validateExtensions(header, extensionSupport)).not.toThrow();
  });
});
