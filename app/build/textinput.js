"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TextInputBuilder = void 0;
const v10_1 = require("discord-api-types/v10");
class TextInputBuilder {
    constructor(option) {
        this.type = 4;
        this.custom_id = option === null || option === void 0 ? void 0 : option.custom_id;
        this.style = option === null || option === void 0 ? void 0 : option.style;
        this.label = option === null || option === void 0 ? void 0 : option.label;
        this.min_length = option === null || option === void 0 ? void 0 : option.min_length;
        this.max_length = option === null || option === void 0 ? void 0 : option.min_length;
        this.required = option === null || option === void 0 ? void 0 : option.required;
        this.placeholder = option === null || option === void 0 ? void 0 : option.placeholder;
    }
    ;
    SetCustomID(custom) {
        this.custom_id = custom;
        return this;
    }
    ;
    SetStyle(style) {
        if (typeof style == "number") {
            this.style = style;
        }
        else if (typeof style == "string") {
            if (style == "Paragraph") {
                this.style = v10_1.TextInputStyle.Paragraph;
            }
            else if (style == "Short") {
                this.style = v10_1.TextInputStyle.Short;
            }
            ;
        }
        ;
        return this;
    }
    ;
    SetLabel(label) {
        this.label = label;
        return this;
    }
    ;
    SetMinLength(value) {
        this.min_length = value;
        return this;
    }
    ;
    SetMaxLength(value) {
        this.max_length = value;
        return this;
    }
    ;
    SetRequired(boolean) {
        this.required = boolean;
        return this;
    }
    ;
    SetValue(value) {
        this.value = value;
        return this;
    }
    ;
    SetPlaceholder(value) {
        this.placeholder = value;
        return this;
    }
    ;
}
exports.TextInputBuilder = TextInputBuilder;
;
