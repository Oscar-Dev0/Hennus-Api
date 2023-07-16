import { APIEmbed } from "discord-api-types/v10";
import { colorType, resolvedColor } from "../utils";

export class EmbedBuilder {

    public type: string;
    public title: APIEmbed["title"];
    public description: APIEmbed["description"];
    public url: APIEmbed["url"];
    public timestamp: APIEmbed["timestamp"];
    public color: APIEmbed["color"];
    public footer: APIEmbed["footer"];
    public image: APIEmbed["image"];
    public thumbnail: APIEmbed["thumbnail"];
    public author: APIEmbed["author"];
    public fields: APIEmbed["fields"]

    constructor(options?: APIEmbed) {
        this.type = "rich";
        this.title = options?.title;
        this.description = options?.description;
        this.url = options?.url;
        this.timestamp = options?.timestamp;
        this.color = options?.color ?? resolvedColor("Default");
        this.footer = options?.footer;
        this.image = options?.image;
        this.thumbnail = options?.thumbnail;
        this.author = options?.author;
        this.save(options?.fields)
        this.fields = [];
    };

    setTitle(value: string) {
        this.title = value;
        return this;
    };

    setDescription(value: string) {
        this.description = value;
        return this;
    };

    setURL(url: string) {
        this.url = url;
        return this;
    };

    setTimeout(time?: Date) {
        if (time) {
            this.timestamp = time.toISOString();
        } else {
            this.timestamp = new Date(Date.now()).toISOString();
        };
        return this;
    };

    setColor(color: colorType) {
        this.color = resolvedColor(color);
        return this;
    };

    setFooter(option: APIEmbed["footer"]) {
        this.footer = option;
        return this;
    };

    setimage(option: APIEmbed["image"] | string) {
        let opt: APIEmbed["image"] = { "url": "" };
        if (option && typeof option === 'object') opt = option;
        else if (typeof option ==='string') opt['url'] = option;
        this.image = opt;
        return this;
    };

    setThumbnail(option: APIEmbed["thumbnail"] | string) {
        let options: APIEmbed["thumbnail"] = {
            url: "",
            height: undefined,
            width: undefined,
        };
        if (typeof option == "string") {
            options.url = option
        } else if (typeof option == "object") {
            options = option;
        }
        this.thumbnail = options;
        return this;
    };

    setAuthor(option: APIEmbed["author"]) {
        this.author = option;
        return this;
    };

    setFields(fields: APIEmbed["fields"]) {
        this.fields = fields;
        return this;
    };

    addFields(fields: APIEmbed["fields"]) {
        this.save(fields);
        return this;
    };

    addField(name: string, value: string, inline?: boolean) {
        const map = [
            {
                name,
                value,
                inline
            }
        ];
        this.save(map);
        return this;
    };

    private save(fields: APIEmbed["fields"]) {
        if (typeof fields == "object") {
            fields.forEach(e => {
                this.fields?.push(e);
            })
        };
    };

    get toJson() {
        return {
            title: this.title,
            description: this.description,
            url: this.url,
            color: this.color,
            author: this.author,
            fields: this.fields,
            thumbnail: this.thumbnail,
            image: this.image,
            footer: this.footer,
            timestamp: this.timestamp
        };
    };
};