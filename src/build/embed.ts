import { APIEmbed } from "discord-api-types/v10";
import { colorType, resolvedColor } from "../utils";

export class EmbedBuilder {
  public type: string = "rich";
  public title?: APIEmbed["title"];
  public description?: APIEmbed["description"];
  public url?: APIEmbed["url"];
  public timestamp?: APIEmbed["timestamp"];
  public color: APIEmbed["color"] = resolvedColor("Default");
  public footer?: APIEmbed["footer"];
  public image?: APIEmbed["image"];
  public thumbnail?: APIEmbed["thumbnail"];
  public author?: APIEmbed["author"];
  public fields: APIEmbed["fields"] = [];

  constructor(options?: APIEmbed) {
    this.title = options?.title;
    this.description = options?.description;
    this.url = options?.url;
    this.timestamp = options?.timestamp ?? undefined
    this.color = resolvedColor(options?.color ?? "Default");
    this.footer = options?.footer;
    this.image = typeof options?.image === "string" ? { url: options?.image } : options?.image;
    this.thumbnail = typeof options?.thumbnail === "string" ? { url: options?.thumbnail } : options?.thumbnail;
    this.author = options?.author;
    this.save(options?.fields);
  }

  public setTitle(value: string): this {
    this.title = value;
    return this;
  }

  public setDescription(value: string): this {
    this.description = value;
    return this;
  }

  public setURL(url: string): this {
    this.url = url;
    return this;
  }

  public setTimestamp(time?: Date): this {
    this.timestamp = time?.toISOString() ?? new Date(Date.now()).toISOString();
    return this;
  }

  public setColor(color: colorType): this {
    this.color = resolvedColor(color);
    return this;
  }

  public setFooter(option: APIEmbed["footer"]): this {
    this.footer = option;
    return this;
  }

  public setImage(option: APIEmbed["image"] | string): this {
    this.image = typeof option === "string" ? { url: option } : option;
    return this;
  }

  public setThumbnail(option: APIEmbed["thumbnail"] | string): this {
    this.thumbnail = typeof option === "string" ? { url: option } : option;
    return this;
  }

  public setAuthor(option: APIEmbed["author"]): this {
    this.author = option;
    return this;
  }

  public setFields(fields: APIEmbed["fields"]): this {
    this.fields = fields ?? [];
    return this;
  }

  public addFields(fields: APIEmbed["fields"]): this {
    this.save(fields);
    return this;
  }

  public addField(name: string, value: string, inline?: boolean): this {
    this.save([{ name, value, inline }]);
    return this;
  }

  private save(fields: APIEmbed["fields"] | undefined): void {
    if (fields && Array.isArray(fields)) {
      this.fields?.push(...fields);
    }
  }
}
