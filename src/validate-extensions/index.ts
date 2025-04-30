import { PulseFrameExtensionSupport } from '../types/pulse-frame-extension-support';
import { PulseFrameHeader } from '../types/pulse-frame-header';

/**
 * Validates whether the RSV1, RSV2, and RSV3 bits in a frame header
 * are allowed based on negotiated extension support.
 *
 * @param header - The frame header containing RSV bits.
 * @param options - Optional frame options indicating which RSV flags are supported by extensions.
 *
 * @throws {Error} If any RSV bit is set without an extension supporting it.
 *
 * @remarks
 * Per [RFC 6455 §5.2](https://datatracker.ietf.org/doc/html/rfc6455#section-5.2), RSV1–RSV3 bits must be zero
 * unless an extension is negotiated that defines meaning for them. This function ensures that any
 * set RSV bit corresponds to an explicitly enabled extension in the frame options.
 *
 * This function is typically called during frame decoding.
 */
export function validateExtensions(header: PulseFrameHeader, extensionSupport: PulseFrameExtensionSupport): void {
  if (header.rsv1 === 1 && !extensionSupport.rsv1) {
    throw new Error('RSV1 is set but not supported by any extension');
  }

  if (header.rsv2 === 1 && !extensionSupport.rsv2) {
    throw new Error('RSV2 is set but not supported by any extension');
  }

  if (header.rsv3 === 1 && !extensionSupport.rsv3) {
    throw new Error('RSV3 is set but not supported by any extension');
  }
}
