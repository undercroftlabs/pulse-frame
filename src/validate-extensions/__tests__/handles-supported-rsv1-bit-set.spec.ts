import { PulseFrameExtensionSupport } from '@/types/pulse-frame-extension-support';
import { PulseFrameHeader } from '@/types/pulse-frame-header';
import { PulseFrameOpcode } from '@/types/pulse-frame-opcode';
import { PulseFrameOptions } from '@/types/pulse-frame-options';
import { validateExtensions } from '..';

/**
 * @spec RFC 6455 §5.2 - Base Framing Protocol
 *
 * RSV1 is a reserved bit in the WebSocket frame header and may be set to 1
 * only when an extension using it has been negotiated during the handshake.
 *
 * This test verifies that if RSV1 is set to 1 and explicitly marked as supported
 * in the extension configuration, the frame is accepted and validation passes.
 */
describe('validateExtensions', () => {
  it('rfc-6455-5.2 rsv1=1 supported', () => {
    const header: PulseFrameHeader = {
      fin: 1,
      rsv1: 1,
      rsv2: 0,
      rsv3: 0,
      mask: 0,
      opcode: PulseFrameOpcode.TEXT,
      length: 1,
      extensionDataLength: 0,
      maskingKey: Buffer.from([0, 0, 0, 0]),
    };

    const extensionSupport: PulseFrameExtensionSupport = {
      rsv1: true,
      rsv2: false,
      rsv3: false,
    };

    expect(() => validateExtensions(header, extensionSupport)).not.toThrow();
  });
});
