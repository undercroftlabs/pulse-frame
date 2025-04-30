import { PulseFrameExtensionSupport } from './pulse-frame-extension-support';

/**
 * Options for parsing or validating a WebSocket frame.
 * These are typically passed during buffer decoding.
 */
export type PulseFrameOptions = {
  /** Length of the extension data to strip from the start of the payload */
  extensionLength?: number;

  /** Negotiated extension bit support (RSV1/RSV2/RSV3) */
  extensionSupport: PulseFrameExtensionSupport;
};