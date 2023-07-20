import { APIAttachment } from "discord-api-types/v10";
import { Stream } from 'node:stream';

class AttachmentBuilder {
  constructor(attachment: Buffer | string | Stream, data: AttachmentData = {}) {
    this.attachment = attachment;
    this.description = data.description ?? null;
    this.name = data.name ?? null;
  };

  public attachment: Buffer | string | Stream;
  public description: string | null;
  public name: string | null;
  private isSpoiler: boolean = false;

  setDescription(description: string): this {
    this.description = description;
    return this;
  };

  setFile(attachment: Buffer | string | Stream, name?: string): this {
    this.attachment = attachment;
    this.name = name || null;
    return this;
  };

  setName(name: string): this {
    this.name = name;
    return this;
  };

  setSpoiler(spoiler: boolean = true): this {
    if (this.isSpoiler === spoiler) return this;
    this.isSpoiler = spoiler;
    this.name = spoiler ? `SPOILER_${this.name || ''}` : this.name?.replace(/^SPOILER_/, '') || null;
    return this;
  };
}

type AttachmentData = {
  name?: string | undefined;
  description?: string | undefined;
};

export {
  AttachmentBuilder,
  AttachmentData
};
