import { APIEmbed } from "discord-api-types/v10";

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
        this.color = options?.color;
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

    setColor(color: number | "Red" | "Blue" | "Yellow" | "Orange" | "Green" | "Purple" | "Cyan" | `#${string}`) {
        if (typeof color == "number") {
            this.color = color;
        } else if (typeof color == "string") {
            if (color == "Blue") {
                this.color = 0x0000ff;
            } else if (color == "Red") {
                this.color = 0xff0000;
            } else if (color == "Green") {
                this.color = 0x00ff00;
            } else if (color == "Orange") {
                this.color = 0xffbf00
            } else if (color == "Yellow") {
                this.color = 0xffff00;
            } else if (color == "Purple") {
                this.color = 0x8000ff;
            } else if (color == "Cyan") {
                this.color = 0x00ffff;
            } else if (/\#\w+/.test(color)) {
                this.color = Number(color.replace("#", "0x"));
            };
        };
        return this;
    };

    setFooter(option: APIEmbed["footer"]) {
        this.footer = option;
        return this;
    };

    setimage(option: APIEmbed["image"]) {
        this.image = option;
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