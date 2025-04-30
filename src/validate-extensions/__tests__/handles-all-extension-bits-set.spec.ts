import { PulseFrameExtensionSupport } from '@/types/pulse-frame-extension-support';
import { PulseFrameHeader } from '@/types/pulse-frame-header';
import { PulseFrameOpcode } from '@/types/pulse-frame-opcode';
import { PulseFrameOptions } from '@/types/pulse-frame-options';
import { validateExtensions } from '..';

/**
 * @spec RFC 6455 §5.2 - Base Framing Protocol
 *
 * A valid WebSocket frame may use the RSV1, RSV2, and RSV3 bits to indicate the presence of
 * extension data if those bits are negotiated and supported by the server.
 *
 * This test asserts that when all three RSV bits are set in the frame header and
 * the corresponding extension flags are enabled in the connection options, the validation
 * function does not throw an error.
 *
 * This ensures that the implementation correctly supports extensions as per RFC 6455 §5.2.
 */
describe('validateExtensions', () => {
  it('rfc-6455-5.2 rsv1=1, rsv2=1, rsv3=1 supported', () => {
    const header: PulseFrameHeader = {
      fin: 1,
      rsv1: 1,
      rsv2: 1,
      rsv3: 1,
      mask: 0,
      opcode: PulseFrameOpcode.TEXT,
      length: 1,
      extensionDataLength: 0,
      maskingKey: Buffer.from([0, 0, 0, 0]),
    };

    const extensionSupport: PulseFrameExtensionSupport = {
      rsv1: true,
      rsv2: true,
      rsv3: true,
    };

    expect(() => validateExtensions(header, extensionSupport)).not.toThrow();
  });
});
