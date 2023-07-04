"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SelectMenuBuilder = void 0;
const v10_1 = require("discord-api-types/v10");
class SelectMenuBuilder {
    constructor(options) {
        this.custom_id = options === null || options === void 0 ? void 0 : options.custom_id;
        this.type = (options === null || options === void 0 ? void 0 : options.type) ? options === null || options === void 0 ? void 0 : options.type : 3;
        if ((options === null || options === void 0 ? void 0 : options.type) == v10_1.ComponentType.StringSelect) {
            if (typeof (options === null || options === void 0 ? void 0 : options.options) == "object") {
                this.save(options.options);
            }
            ;
        }
        else if ((options === null || options === void 0 ? void 0 : options.type) == v10_1.ComponentType.ChannelSelect) {
            this.channel_types = options === null || options === void 0 ? void 0 : options.channel_types;
        }
        ;
        this.options = [];
        this.placeholder = options === null || options === void 0 ? void 0 : options.placeholder;
        this.min_values = options === null || options === void 0 ? void 0 : options.min_values;
        this.max_values = options === null || options === void 0 ? void 0 : options.max_values;
        this.disabled = options === null || options === void 0 ? void 0 : options.disabled;
    }
    ;
    SetCustomId(custom) {
        this.custom_id = custom;
        return this;
    }
    ;
    SetType(type) {
        if (typeof type == "number") {
            this.type = type;
        }
        else if (typeof type == "string") {
            if (type == "Text")
                this.type == v10_1.ComponentType.StringSelect;
            if (type == "User")
                this.type == v10_1.ComponentType.UserSelect;
            if (type == "Role")
                this.type == v10_1.ComponentType.RoleSelect;
            if (type == "Channels")
                this.type == v10_1.ComponentType.ChannelSelect;
            if (type == "Mentionable")
                this.type == v10_1.ComponentType.MentionableSelect;
        }
        ;
        return this;
    }
    ;
    setPlaceHolder(text) {
        this.placeholder = text;
        return this;
    }
    ;
    /**
     * @description
     * funcion carga directamente las opciones al cache
     * @description
     * esta funcion solo va con el tipo 3 es un menu de texto
     */
    SetOptions(options) {
        this.options = options;
        return this;
    }
    ;
    /**
     * @description
     * esta funcion carga las opciones ya al cache que existe en el slectmenu.
     * @description
     * esta funcion solo va con el tipo 3 es un menu de texto.
     */
    AddOptions(options) {
        this.save(options);
        return this;
    }
    ;
    AddOption(option) {
        this.save([option]);
        return this;
    }
    ;
    /**
     * @description
     * esta funcion solo va con el tipo 8 es un menu de texto.
     */
    SetChannelTypes(channel_types) {
        this.channel_types = channel_types;
        return this;
    }
    ;
    SetMinValues(values) {
        if (typeof values == "number") {
            this.min_values = values;
            if (this.min_values > 25) {
                this.min_values = 25;
            }
            ;
        }
        ;
        return this;
    }
    ;
    SetMaxValues(values) {
        if (typeof values == "number") {
            this.max_values = values;
            if (this.max_values > 25) {
                this.max_values = 25;
            }
            ;
        }
        ;
        return this;
    }
    ;
    SetDisabled(boolean) {
        this.disabled = boolean;
        return this;
    }
    ;
    save(options) {
        if (!options)
            return;
        if (!(this === null || this === void 0 ? void 0 : this.type))
            return;
        if ((this === null || this === void 0 ? void 0 : this.type) == 3) {
            const map = this.options;
            options.forEach((x) => {
                map === null || map === void 0 ? void 0 : map.push(x);
            });
        }
    }
}
exports.SelectMenuBuilder = SelectMenuBuilder;
;
