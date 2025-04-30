import { PulseFrameOpcode } from '@/types/pulse-frame-opcode';
import { createFrame } from '..';

/**
 * @spec RFC 6455 §5.2 - Base Framing Protocol
 *
 * If a WebSocket extension is negotiated that uses extension data (e.g. compression),
 * that data must appear immediately after the base header and must be accounted for
 * using the `extensionDataLength` field.
 *
 * This test verifies that the `createFrame` function:
 * - correctly assigns the provided `extensionData` to the frame,
 * - and sets the `extensionDataLength` field on the header accordingly.
 */
describe('createFrame', () => {
  it('rfc-6455-5.2 sets extensionData and updates header extensionDataLength', () => {
    const payload = Buffer.from('data');
    const extensionData = Buffer.from('ext');

    const frame = createFrame({
      opcode: PulseFrameOpcode.BINARY,
      payloadData: payload,
      extensionData,
      extensionDataLength: extensionData.length,
    });

    expect(frame.getExtensionData()).toEqual(extensionData);
    expect(frame.getHeader().extensionDataLength).toBe(extensionData.length);
  });
});
