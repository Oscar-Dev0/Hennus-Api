"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ButtonsBuilder = void 0;
const v10_1 = require("discord-api-types/v10");
class ButtonsBuilder {
    constructor(options) {
        var _a, _b, _c, _d;
        this.type = 2;
        this.style = (options === null || options === void 0 ? void 0 : options.style) || 1;
        this.label = options === null || options === void 0 ? void 0 : options.label;
        this.emoji = { name: (_a = options === null || options === void 0 ? void 0 : options.emoji) === null || _a === void 0 ? void 0 : _a.name, id: (_b = options === null || options === void 0 ? void 0 : options.emoji) === null || _b === void 0 ? void 0 : _b.id, animated: (_c = options === null || options === void 0 ? void 0 : options.emoji) === null || _c === void 0 ? void 0 : _c.animated };
        this.custom_id = undefined;
        this.url = undefined;
        if ((options === null || options === void 0 ? void 0 : options.style) == v10_1.ButtonStyle.Link) {
            this.url = options === null || options === void 0 ? void 0 : options.url;
        }
        else {
            this.custom_id = (_d = options === null || options === void 0 ? void 0 : options.custom_id) !== null && _d !== void 0 ? _d : undefined;
        }
        ;
    }
    ;
    SetStyle(style) {
        if (typeof style == "string") {
            let number = 1;
            if (style == "Primary") {
                number = 1;
            }
            else if (style == "Secondary") {
                number = 2;
            }
            else if (style == "Success") {
                number = 3;
            }
            else if (style == "Danger") {
                number = 4;
            }
            else if (style == "Link") {
                number = 5;
            }
            ;
            this.style = number;
        }
        else if (typeof style == "number") {
            this.style = style;
        }
        ;
        return this;
    }
    ;
    SetLabel(label) {
        if (label == undefined) {
            this.label = undefined;
        }
        ;
        if (typeof label == "string") {
            this.label = label.slice(0, 80);
        }
        ;
        return this;
    }
    ;
    SetEmoji(name, id, animated) {
        if (name == undefined) {
            this.emoji = { name: undefined, id: undefined, animated: undefined };
        }
        ;
        if (typeof name == "object") {
            this.emoji = name;
        }
        else if (typeof name == "string") {
            const options = {
                name,
                id,
                animated
            };
            this.emoji = options;
        }
        ;
        return this;
    }
    ;
    SetCustomId(id) {
        if (typeof id == "string") {
            this.custom_id = id;
        }
        ;
        return this;
    }
    ;
    SetURL(url) {
        if (typeof url == "string") {
            if (this.style == 5) {
                this.url = url;
            }
            ;
        }
        ;
        return this;
    }
    ;
}
exports.ButtonsBuilder = ButtonsBuilder;
;
