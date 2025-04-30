import { PulseFrame } from '@/types/pulse-frame';
import { PulseFrameHeader } from '@/types/pulse-frame-header';

/**
 * @spec RFC 6455 §5.6 - Data Framing
 *
 * Application data is the final unmasked data made available after processing
 * any extensions. This test ensures `setApplicationData()` allows updating
 * the application-visible payload after the frame is constructed.
 */
describe('PulseFrame.setApplicationData', () => {
  it('correctly sets the application data buffer after construction', () => {
    const header: PulseFrameHeader = {
      fin: 1,
      rsv1: 0,
      rsv2: 0,
      rsv3: 0,
      mask: 0,
      opcode: 1,
      length: 5,
      extensionDataLength: 0,
      maskingKey: undefined,
    };

    const initialPayload = Buffer.from('hello');
    const frame = new PulseFrame(header, initialPayload, undefined, initialPayload);

    // Capture original value
    const original = frame.getPayloadString();

    // Override application data after construction
    frame.setApplicationData(Buffer.from('world'));

    expect(original).toEqual('hello');
    expect(frame.getPayloadString()).toEqual('world');
  });
});
