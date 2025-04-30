import { maskPayload } from '../mask-payload';
import { PulseFrame } from '../types/pulse-frame';
import { PulseFrameBuildOptions } from '../types/pulse-frame-build-options';
import { PulseFrameHeader } from '../types/pulse-frame-header';

/**
 * Creates a complete `PulseFrame` instance for transmission over a WebSocket connection.
 *
 * This function builds the frame header and payload according to
 * [RFC 6455 §5.2 - Base Framing Protocol](https://datatracker.ietf.org/doc/html/rfc6455#section-5.2),
 * ensuring correct encoding of all fields and masking (if required).
 *
 * ### RFC 6455 Compliance:
 *
 * - **FIN / RSV1-3 bits**: Set based on options; used for fragmentation and extensions.
 * - **Opcode**: Determines the type of frame (text, binary, close, ping, pong).
 * - **Masking**:
 *   - Applied if `mask` is `1` and a `maskingKey` is provided.
 *   - Required for clients; servers **MUST NOT** mask frames ([RFC §5.1]).
 * - **Payload length**:
 *   - Calculated after masking is applied.
 *   - Determines how many length bytes will be encoded later in serialization.
 *
 * This function does **not** serialize the frame; it prepares the internal representation.
 * For binary transmission, use `frame.toBuffer()`.
 *
 * @param options - Frame metadata and payload data.
 * @returns A fully prepared {@link PulseFrame} instance with a correct header and (optionally masked) payload.
 *
 * @example
 * ```ts
 * const frame = createFrame({
 *   fin: 1,
 *   opcode: PulseFrameOpcode.TEXT,
 *   mask: 1,
 *   maskingKey: createRandomBytes(4),
 *   payloadData: Buffer.from("Hello"),
 * });
 * socket.write(frame.toBuffer());
 * ```
 *
 * @see RFC 6455 §5.2 - Base Framing Protocol
 * @see RFC 6455 §5.1 - Client-to-Server Masking
 */
export function createFrame(options: PulseFrameBuildOptions): PulseFrame {
  const header: PulseFrameHeader = {
    fin: options.fin ?? 1,
    rsv1: options.rsv1 ?? 0,
    rsv2: options.rsv2 ?? 0,
    rsv3: options.rsv3 ?? 0,
    mask: options.mask ?? 0,
    opcode: options.opcode,
    extensionDataLength: options.extensionDataLength ?? 0,
    maskingKey: options.maskingKey,
    length: 0,
  };

  const payloadData = options.payloadData ?? Buffer.alloc(0);
  const isMasked = header.mask === 1 && !!header.maskingKey;
  const extensionData = options.extensionData ?? undefined;

  const payload = isMasked
    ? maskPayload(payloadData, header.maskingKey!)
    : payloadData;

  header.length = payload.length;

  return new PulseFrame(header, payload, extensionData, payload);
}
