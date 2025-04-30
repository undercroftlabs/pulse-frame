import { PulseFrame } from '@/types/pulse-frame';
import { PulseFrameHeader } from '@/types/pulse-frame-header';

/**
 * @spec Internal API - Frame Metadata
 *
 * Ensures that `getHeader()` returns the same `PulseFrameHeader` object
 * that was provided to the constructor. This allows consumers to inspect
 * metadata such as opcode, FIN, RSV bits, masking, and payload length.
 */
describe('PulseFrame.getHeader', () => {
  it('returns the header object', () => {
    const header = {
      fin: 1,
      rsv1: 0,
      rsv2: 0,
      rsv3: 0,
      mask: 0,
      opcode: 1,
      length: 5,
      extensionDataLength: 0,
      maskingKey: undefined,
    } as PulseFrameHeader;

    const frame = new PulseFrame(header, Buffer.from('hello'), undefined, Buffer.from('hello'));

    expect(frame.getHeader()).toEqual(header);
  });
});
