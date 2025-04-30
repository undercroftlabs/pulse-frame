import { PulseFrameOpcode } from '@/types/pulse-frame-opcode';
import { createFrame } from '..';

/**
 * @spec RFC 6455 §5.2 - Base Framing Protocol
 *
 * When constructing a frame with no optional fields (e.g., no masking, no payload),
 * the frame should default to a minimal header with:
 * - `FIN = 1` (message is complete),
 * - `RSV1-3 = 0` (no extensions),
 * - `MASK = 0` (not masked),
 * - `payload length = 0`,
 * - no masking key,
 * - and no extension data.
 *
 * This test ensures that the `createFrame` function correctly fills in defaults
 * when only the mandatory `opcode` is provided.
 */
describe('createFrame', () => {
  it('rfc-6455-5.2 creates a minimal frame with correct default values', () => {
    const frame = createFrame({ opcode: PulseFrameOpcode.TEXT });
    const header = frame.getHeader();

    expect(header.fin).toBe(1);
    expect(header.rsv1).toBe(0);
    expect(header.rsv2).toBe(0);
    expect(header.rsv3).toBe(0);
    expect(header.mask).toBe(0);
    expect(header.opcode).toBe(PulseFrameOpcode.TEXT);
    expect(header.length).toBe(0);
    expect(header.extensionDataLength).toBe(0);
    expect(header.maskingKey).toBeUndefined();
    expect(frame.getPayload()).toEqual(Buffer.alloc(0));
  });
});
