import { PulseFrameExtensionSupport } from '@/types/pulse-frame-extension-support';
import { PulseFrameHeader } from '@/types/pulse-frame-header';
import { PulseFrameOpcode } from '@/types/pulse-frame-opcode';
import { PulseFrameOptions } from '@/types/pulse-frame-options';
import { validateExtensions } from '..';

/**
 * @spec RFC 6455 §5.2 - Base Framing Protocol
 *
 * RSV3 is a reserved bit in the WebSocket frame header. It must be zero unless
 * a negotiated extension makes use of it.
 *
 * This test ensures that if RSV3 is set in the frame and explicitly supported
 * by the extension configuration, validation passes without error.
 */
describe('validateExtensions', () => {
  it('rfc-6455-5.2 rsv3=1 supported', () => {
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
      rsv3: true,
    };

    expect(() => validateExtensions(header, extensionSupport)).not.toThrow();
  });
});
//
