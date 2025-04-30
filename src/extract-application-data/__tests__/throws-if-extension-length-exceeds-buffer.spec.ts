import { extractApplicationData } from "..";
import { PulseFrameError } from "@/types/pulse-frame-error";

/**
 * @spec RFC 6455 §5.2 - Base Framing Protocol
 *
 * Extension data must not exceed the size of the frame payload.
 * If the `extensionDataLength` is greater than the buffer size, the frame is malformed.
 */
describe('extractApplicationData', () => {
    it('rfc-6455-5.2 throws if extension length exceeds buffer size', () => {
      const buffer = Buffer.from('short');
      const invalidLength = buffer.length + 1;
  
      expect(() => extractApplicationData(buffer, invalidLength)).toThrow(
        new PulseFrameError('Invalid application data length: exceeds buffer size'),
      );
    });
  });