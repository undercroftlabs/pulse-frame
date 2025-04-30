import { PulseFrame } from '@/types/pulse-frame';
import { PulseFrameOpcode } from '@/types/pulse-frame-opcode';

/**
 * @spec RFC 6455 §5.2–5.5 — Frame structure, control opcodes, and extension metadata.
 *
 * These tests verify the `PulseFrame.toJSON()` method, which is used to serialize
 * frame metadata for logging, debugging, or diagnostics.
 */
describe('PulseFrame.toJSON', () => {
  it('serializes all header and data fields correctly', () => {
    const payload = Buffer.from('json-payload');
    const extension = Buffer.from('ext');

    const frame = new PulseFrame(
      {
        fin: 1,
        rsv1: 0,
        rsv2: 1,
        rsv3: 0,
        mask: 1,
        opcode: PulseFrameOpcode.TEXT,
        length: payload.length,
        extensionDataLength: extension.length,
        maskingKey: Buffer.from([1, 2, 3, 4]),
      },
      payload,
      extension,
      payload,
    );

    const result = frame.toJSON();

    expect(result).toEqual({
      fin: 1,
      rsv1: 0,
      rsv2: 1,
      rsv3: 0,
      opcode: 'TEXT',
      mask: 1,
      length: payload.length,
      isControl: false,
      isText: true,
      isBinary: false,
      isClose: false,
      isPing: false,
      isPong: false,
      isMasked: true,
      applicationDataLength: payload.length,
      extensionDataLength: extension.length,
    });
  });

  it('displays unknown opcode if opcode is invalid', () => {
    const payload = Buffer.from('test');

    const frame = new PulseFrame(
      {
        fin: 1,
        rsv1: 0,
        rsv2: 0,
        rsv3: 0,
        mask: 0,
        opcode: 255 as PulseFrameOpcode, // Invalid opcode
        length: payload.length,
        extensionDataLength: 0,
        maskingKey: undefined,
      },
      payload,
      undefined,
      payload,
    );

    const result = frame.toJSON();

    expect(result.opcode).toBe('Unknown(255)');
  });

  it('returns correct JSON when applicationData is undefined', () => {
    const frame = new PulseFrame(
      {
        fin: 1,
        rsv1: 0,
        rsv2: 0,
        rsv3: 0,
        mask: 0,
        opcode: PulseFrameOpcode.TEXT,
        length: 0,
        extensionDataLength: 0,
        maskingKey: undefined,
      },
      Buffer.alloc(0),
      undefined,
      undefined,
    );

    const json = frame.toJSON();

    expect(json.applicationDataLength).toBe(0);
    expect(json.extensionDataLength).toBe(0);
  });
});
