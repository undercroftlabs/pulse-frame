import { createFrameFromBuffer } from '..';
import { PulseFrameOptions } from '@/types/pulse-frame-options';

/**
 * @spec RFC 6455 §5.2 — Extension Data
 *
 * This test verifies that when `extensionLength` is provided,
 * the extension data is extracted from the beginning of the payload,
 * and the application data is extracted from the remainder.
 */
describe('createFrameFromBuffer', () => {
  it('parses extension data if extensionLength is provided', () => {
    const extensionData = Buffer.from([0xde, 0xad]);
    const applicationData = Buffer.from([0xbe, 0xef]);
    const fullPayload = Buffer.concat([extensionData, applicationData]);

    const header = Buffer.from([
      0x81, // FIN=1, opcode=TEXT
      fullPayload.length, // Payload length = 4
    ]);

    const buffer = Buffer.concat([header, fullPayload]);

    const options = {
      extensionLength: extensionData.length,
    } as PulseFrameOptions;

    const frame = createFrameFromBuffer(buffer, options);

    expect(frame.getExtensionData()).toEqual(extensionData);
    expect(frame.getPayload()).toEqual(applicationData);
  });
});
