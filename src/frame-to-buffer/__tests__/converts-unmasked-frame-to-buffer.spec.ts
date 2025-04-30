import { frameToBuffer } from '..';
import { PulseFrame } from '@/types/pulse-frame';
import { PulseFrameHeader } from '@/types/pulse-frame-header';
import { PulseFrameOpcode } from '@/types/pulse-frame-opcode';

/**
 * @spec RFC 6455 §5.2 - Base Framing Protocol
 *
 * Validates that a non-masked text frame is correctly serialized into a buffer.
 */
describe('frameToBuffer', () => {
  it('rfc-6455-5.2 converts unmasked frame to buffer', () => {
    const payload = Buffer.from('Hi');
    const header: PulseFrameHeader = {
      fin: 1,
      rsv1: 0,
      rsv2: 0,
      rsv3: 0,
      mask: 0,
      opcode: PulseFrameOpcode.TEXT,
      length: payload.length,
      extensionDataLength: 0,
      maskingKey: undefined,
    };

    const frame = new PulseFrame(header, payload, undefined, payload);
    const buffer = frameToBuffer(frame);

    expect(buffer[0]).toBe(0x81); // FIN + TEXT opcode
    expect(buffer[1]).toBe(payload.length); // No mask
    expect(buffer.subarray(2).toString()).toBe('Hi');
  });
});
