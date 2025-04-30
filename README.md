# Pulse Frame

`pulse-frame` is a lightweight, zero-dependency WebSocket framing library written in TypeScript. It
implements the WebSocket frame format defined in [RFC 6455, Section 5](https://datatracker.ietf.org/doc/html/rfc6455#section-5),
providing core utilities to parse, validate, and construct frames with full support for masking,
extensions, and control opcodes.

---

## Features

- ✅ Full support for text, binary, continuation, and control frames
- ✅ RFC-compliant masking and unmasking logic
- ✅ Extension-aware (RSV1/2/3 validation)
- ✅ Frame validation (e.g. close codes, control length limits)
- ✅ Comprehensive test coverage

---

## What is WebSocket framing?

WebSocket data is sent in discrete **frames**, not a continuous byte stream. Every frame consists of
a small header and an optional payload. For example:

```
 0               1               2               3
 0 1 2 3 4 5 6 7 0 1 2 3 4 5 6 7 0 1 2 3 4 5 6 7 0 1 2 3 4 5 6 7
+-+-+-+-+-------+---------------+-------------------------------+
|F|R|R|R| opcode| Mask | Payload len (7) | (extended + masking)  |
+-+-+-+-+-------+---------------+-------------------------------+
```

- **FIN/RSV1/RSV2/RSV3**: Control how data is processed.
- **Opcode**: Tells what kind of data this is (text, binary, ping, etc).
- **Mask**: Whether the data is XOR-masked (required for client-to-server).
- **Payload length**: May be 7, 16, or 64 bits long depending on size.
- **Masking key** (if set) + **payload** follow.

This library helps you construct and parse that structure cleanly.

---

## Usage

```ts
import {
  createFrameFromBuffer,
  frameToBuffer,
  PulseFrameOpcode,
} from 'pulse-frame';

// Parse an incoming WebSocket frame
const frame = createFrameFromBuffer(rawBuffer);

if (frame.isText()) {
  console.log(frame.getPayloadString());
}

// Create a new frame
const outFrame = createFrame({
  opcode: PulseFrameOpcode.TEXT,
  payloadData: Buffer.from('hello'),
});

const wireBuffer = frameToBuffer(outFrame);
```

---

## Modules

Each function is organized by responsibility:

- **Parsing**: `createFrameFromBuffer`, `parseHeader`, `readPayloadLength`
- **Building**: `createFrame`, `frameToBuffer`, `packHeaderBytes`
- **Validation**: `validateOpcode`, `validateExtensions`, `validateCloseFramePayload`
- **Masking**: `maskPayload`, `unmaskPayload`, `extractMaskingKey`
- **Splitting**: `extractPayload`, `extractExtensionData`, `extractApplicationData`

---

## Testing

`pulse-frame` is covered by over 100 unit tests, covering edge cases like:

- Unmasked/masked frame parsing
- Control frame length enforcement
- Payload lengths using 7/16/64-bit representations
- RSV bits with/without extension support

You can run tests via:

```bash
npm run test
```

Or view coverage:

```bash
npm run coverage
```

---

For more details on the available methods and their usage, please refer to the API documentation or
the source code.

## Contributing

Contributions to the Timespan class are welcome! If you have any issues or suggestions for improvements,
please open an issue or submit a pull request on the GitHub repository.

## License

The Timespan class is licensed under the MIT License. See the LICENSE file for more information.
