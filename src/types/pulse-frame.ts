import { OPCODE_CONTROL_THRESHOLD } from './constants';
import { PulseFrameHeader } from './pulse-frame-header';
import { PulseFrameOpcode } from './pulse-frame-opcode';

/**
 * Represents a single WebSocket frame, parsed or constructed manually.
 *
 * A frame is the fundamental unit of data transmission in the WebSocket protocol.
 *
 * @see [RFC 6455, Section 5.2 - Base Framing Protocol](https://www.rfc-editor.org/rfc/rfc6455#section-5.2)
 */
export class PulseFrame {
  private readonly header: PulseFrameHeader;
  private readonly payload: Buffer;
  private readonly extensionData?: Buffer;
  private readonly applicationData?: Buffer;
  private readonly masked: boolean;

  constructor(
    header: PulseFrameHeader,
    payloadData: Buffer,
    extensionData?: Buffer,
    applicationData?: Buffer,
  ) {
    this.header = header;
    this.payload = payloadData;
    this.extensionData = extensionData;
    this.applicationData = applicationData;

    // Cache this at construction time
    this.masked = header.mask === 1 && !!header.maskingKey;
  }

  /**
   * Only used internally after parsing to set application-level decoded payload.
   */
  public setApplicationData(data: Buffer): void {
    (this as any).applicationData = data; // Or refactor constructor instead
  }

  /**
   * Returns the decoded payload (application data if available).
   */
  public getPayload(): Buffer {
    return this.applicationData ?? this.payload;
  }

  /**
   * Returns the payload as a UTF-8 string, if any.
   */
  public getPayloadString(): string {
    return this.applicationData?.toString('utf8') ?? '';
  }

  /**
   * Returns the parsed extension data.
   */
  public getExtensionData(): Buffer | undefined {
    return this.extensionData;
  }

  /**
   * Returns the raw parsed header.
   */
  public getHeader(): PulseFrameHeader {
    return this.header;
  }

  /** Whether the payload was masked. */
  public isMasked(): boolean {
    return this.masked;
  }

  /** Whether this is the final frame in a sequence. */
  public isFinal(): boolean {
    return this.header.fin === 1;
  }

  /** Returns the frame's opcode. */
  public getOpcode(): PulseFrameOpcode {
    return this.header.opcode;
  }

  /** Whether this frame contains text data. */
  public isText(): boolean {
    return this.header.opcode === PulseFrameOpcode.TEXT;
  }

  /** Whether this frame contains binary data. */
  public isBinary(): boolean {
    return this.header.opcode === PulseFrameOpcode.BINARY;
  }

  /** Whether this frame continues a fragmented message. */
  public isContinuation(): boolean {
    return this.header.opcode === PulseFrameOpcode.CONTINUATION;
  }

  /** Whether this frame is a control frame. */
  public isControl(): boolean {
    return this.header.opcode >= OPCODE_CONTROL_THRESHOLD;
  }

  /** Whether this frame is a ping. */
  public isPing(): boolean {
    return this.header.opcode === PulseFrameOpcode.PING;
  }

  /** Whether this frame is a pong. */
  public isPong(): boolean {
    return this.header.opcode === PulseFrameOpcode.PONG;
  }

  /** Whether this frame is a connection close. */
  public isClose(): boolean {
    return this.header.opcode === PulseFrameOpcode.CLOSE;
  }

  /** Whether this is a text or binary data frame. */
  public isData(): boolean {
    return this.isText() || this.isBinary();
  }

  /**
   * Converts this frame to a plain object for logging or inspection.
   */
  public toJSON(): Record<string, unknown> {
    return {
      fin: this.header.fin,
      rsv1: this.header.rsv1,
      rsv2: this.header.rsv2,
      rsv3: this.header.rsv3,
      opcode:
        PulseFrameOpcode[this.header.opcode] ??
        `Unknown(${this.header.opcode})`,
      mask: this.header.mask,
      length: this.header.length,
      isControl: this.isControl(),
      isText: this.isText(),
      isBinary: this.isBinary(),
      isClose: this.isClose(),
      isPing: this.isPing(),
      isPong: this.isPong(),
      isMasked: this.masked,
      applicationDataLength: this.applicationData?.length ?? 0,
      extensionDataLength: this.extensionData?.length ?? 0,
    };
  }

  /**
   * Returns a short string representation of the frame.
   */
  public toString(): string {
    return `PulseFrame[opcode=${
      PulseFrameOpcode[this.header.opcode] ?? this.header.opcode
    }, fin=${this.header.fin}, length=${this.header.length}, masked=${
      this.masked
    }]`;
  }
}
