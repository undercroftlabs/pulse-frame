/**
 * Indicates which reserved bits (RSV1, RSV2, RSV3) are supported by negotiated extensions.
 * If a bit is set to true, it means an extension has explicitly enabled it.
 */
export type PulseFrameExtensionSupport = {
  rsv1?: boolean;
  rsv2?: boolean;
  rsv3?: boolean;
};