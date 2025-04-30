import { frameToBuffer } from '..';
import { PulseFrame } from '@/types/pulse-frame';
import { PulseFrameHeader } from '@/types/pulse-frame-header';
import { PulseFrameOpcode } from '@/types/pulse-frame-opcode';

/**
 * @spec RFC 6455 §5.2 - Base Framing Protocol
 *
 * Frames with an empty payload (0 length) must still produce a valid frame.
 * This test ensures `frameToBuffer` handles zero-length payloads correctly.
 */
describe('frameToBuffer', () => {
  it('rfc-6455-5.2 encodes frame with empty payload correctly', () => {
    const emptyPayload = Buffer.alloc(0);

    const header: PulseFrameHeader = {
      fin: 1,
      rsv1: 0,
      rsv2: 0,
      rsv3: 0,
      mask: 0,
      opcode: PulseFrameOpcode.TEXT,
      length: 0,
      extensionDataLength: 0,
      maskingKey: undefined,
    };

    const frame = new PulseFrame(header, emptyPayload, undefined, emptyPayload);
    const buffer = frameToBuffer(frame);

    expect(buffer.length).toBe(2); // header only (no extended length, no payload)
    expect(buffer[0]).toBe(0x81); // FIN=1, opcode=TEXT
    expect(buffer[1]).toBe(0x00); // MASK=0, length=0
  });
});
