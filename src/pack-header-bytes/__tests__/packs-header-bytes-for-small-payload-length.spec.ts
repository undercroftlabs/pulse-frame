import { PulseFrameHeader } from '@/types/pulse-frame-header';
import { PulseFrameOpcode } from '@/types/pulse-frame-opcode';
import { packHeaderBytes } from '..';

/**
 * @spec RFC 6455 §5.2 - Base Framing Protocol
 *
 * For payloads < 126, the second byte directly encodes the payload length
 * in the least significant 7 bits. This test ensures correct encoding for small payloads.
 */
describe('packHeaderBytes', () => {
  it('rfc-6455-5.2 packs header bytes for payload length < 126', () => {
    const header: PulseFrameHeader = {
      fin: 1,
      rsv1: 0,
      rsv2: 0,
      rsv3: 0,
      mask: 1,
      opcode: PulseFrameOpcode.TEXT,
      length: 0, // not used here
      extensionDataLength: 0,
      maskingKey: undefined,
    };

    const [byte0, byte1] = packHeaderBytes(header, 42);

    // byte0: FIN=1, RSV1-3=0, OPCODE=1 (TEXT)
    expect(byte0).toBe(0b10000001); // 129

    // byte1: MASK=1 << 7 | 42
    expect(byte1).toBe((1 << 7) | 42); // 170
  });
});
