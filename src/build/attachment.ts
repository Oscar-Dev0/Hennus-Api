import { APIAttachment } from "discord-api-types/v10";
import { Stream } from 'node:stream';

class AttachmentBuilder {
  constructor(attachment: BufferResolvable | Stream, data: AttachmentData = {}) {
    this.attachment = attachment;
    this.description = data.description ?? null;
    this.name = data.name ?? null;
  };

  public attachment: BufferResolvable | Stream;
  public description: string | null;
  public name: string | null;
  private spoiler: boolean = false;

  setDescription(description: string): this {
    this.description = description;
    return this;
  };

  setFile(attachment: BufferResolvable | Stream, name?: string): this {
    this.attachment = attachment;
    this.name = name || null;
    return this;
  };

  setName(name: string): this {
    this.name = name;
    return this;
  };

  setSpoiler(spoiler: boolean = true) {
    if(this.spoiler == spoiler) return;
    this.spoiler = spoiler;
    if(!spoiler && this.name) this.name = this.name.slice("SPOILER_".length);
    if(spoiler && this.name)  this.name = `SPOILER_${this.name}`;
    return this;
  };
}

type BufferResolvable = Buffer | string;

type AttachmentData = {
  name?: string | undefined;
  description?: string | undefined;
};

export {
  AttachmentBuilder,
  BufferResolvable,
  AttachmentData
};
