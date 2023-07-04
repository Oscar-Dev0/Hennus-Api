"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.EmbedBuilder = void 0;
class EmbedBuilder {
    constructor(options) {
        this.type = "rich";
        this.title = options === null || options === void 0 ? void 0 : options.title;
        this.description = options === null || options === void 0 ? void 0 : options.description;
        this.url = options === null || options === void 0 ? void 0 : options.url;
        this.timestamp = options === null || options === void 0 ? void 0 : options.timestamp;
        this.color = options === null || options === void 0 ? void 0 : options.color;
        this.footer = options === null || options === void 0 ? void 0 : options.footer;
        this.image = options === null || options === void 0 ? void 0 : options.image;
        this.thumbnail = options === null || options === void 0 ? void 0 : options.thumbnail;
        this.author = options === null || options === void 0 ? void 0 : options.author;
        this.save(options === null || options === void 0 ? void 0 : options.fields);
        this.fields = [];
    }
    ;
    setTitle(value) {
        this.title = value;
        return this;
    }
    ;
    setDescription(value) {
        this.description = value;
        return this;
    }
    ;
    setURL(url) {
        this.url = url;
        return this;
    }
    ;
    setTimeout(time) {
        if (time) {
            this.timestamp = time.toISOString();
        }
        else {
            this.timestamp = new Date(Date.now()).toISOString();
        }
        ;
        return this;
    }
    ;
    setColor(color) {
        if (typeof color == "number") {
            this.color = color;
        }
        else if (typeof color == "string") {
            if (color == "Blue") {
                this.color = 0x0000ff;
            }
            else if (color == "Red") {
                this.color = 0xff0000;
            }
            else if (color == "Green") {
                this.color = 0x00ff00;
            }
            else if (color == "Orange") {
                this.color = 0xffbf00;
            }
            else if (color == "Yellow") {
                this.color = 0xffff00;
            }
            else if (color == "Purple") {
                this.color = 0x8000ff;
            }
            else if (color == "Cyan") {
                this.color = 0x00ffff;
            }
            else if (/\#\w+/.test(color)) {
                this.color = Number(color.replace("#", "0x"));
            }
            ;
        }
        ;
        return this;
    }
    ;
    setFooter(option) {
        this.footer = option;
        return this;
    }
    ;
    setimage(option) {
        this.image = option;
        return this;
    }
    ;
    setThumbnail(option) {
        let options = {
            url: "",
            height: undefined,
            width: undefined,
        };
        if (typeof option == "string") {
            options.url = option;
        }
        else if (typeof option == "object") {
            options = option;
        }
        this.thumbnail = options;
        return this;
    }
    ;
    setAuthor(option) {
        this.author = option;
        return this;
    }
    ;
    setFields(fields) {
        this.fields = fields;
        return this;
    }
    ;
    addFields(fields) {
        this.save(fields);
        return this;
    }
    ;
    addField(name, value, inline) {
        const map = [
            {
                name,
                value,
                inline
            }
        ];
        this.save(map);
        return this;
    }
    ;
    save(fields) {
        if (typeof fields == "object") {
            fields.forEach(e => {
                var _a;
                (_a = this.fields) === null || _a === void 0 ? void 0 : _a.push(e);
            });
        }
        ;
    }
    ;
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
    }
    ;
}
exports.EmbedBuilder = EmbedBuilder;
;
