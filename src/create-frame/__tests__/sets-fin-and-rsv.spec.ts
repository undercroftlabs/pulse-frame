import { PulseFrameOpcode } from '@/types/pulse-frame-opcode';
import { createFrame } from '..';

/**
 * @spec RFC 6455 §5.2 - Base Framing Protocol
 *
 * The first byte of the frame header includes:
 * - The FIN bit indicating if this is the final frame of the message.
 * - RSV1–3 bits reserved for negotiated extensions.
 *
 * This test verifies that the `createFrame` function properly sets:
 * - the `FIN` bit to indicate fragmentation state,
 * - and the RSV bits when explicitly provided by the caller.
 *
 * This behavior is important for supporting extensions and partial (fragmented) messages.
 */
describe('createFrame', () => {
  it('rfc-6455-5.2 sets FIN and RSV bits correctly when provided', () => {
    const frame = createFrame({
      opcode: PulseFrameOpcode.TEXT,
      fin: 0,
      rsv1: 1,
      rsv2: 1,
      rsv3: 1,
    });

    const header = frame.getHeader();
    expect(header.fin).toBe(0);
    expect(header.rsv1).toBe(1);
    expect(header.rsv2).toBe(1);
    expect(header.rsv3).toBe(1);
  });
});
