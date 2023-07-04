"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ModalBuilder = void 0;
const v10_1 = require("discord-api-types/v10");
const actionrow_1 = require("./actionrow");
class ModalBuilder {
    constructor(options) {
        this.title = options === null || options === void 0 ? void 0 : options.title;
        this.custom_id = options === null || options === void 0 ? void 0 : options.custom_id;
        this.components = [];
        if (options === null || options === void 0 ? void 0 : options.components) {
            this.setComponents(options.components);
        }
        ;
    }
    ;
    setTitle(title) {
        this.title = title;
        return this;
    }
    ;
    setCustomId(custom) {
        this.custom_id = custom;
        return this;
    }
    ;
    addTextInputComponents(components) {
        const data = [...this.components];
        components.forEach((component) => {
            const map = this.components.filter(x => x.components.find(z => { if (z.type !== v10_1.ComponentType.Button)
                z.custom_id == component.custom_id; }));
            if (!map.length) {
                data.push(new actionrow_1.ActionRowBuilder().AddComponet(component));
            }
        });
        this.components = data;
        return this;
    }
    ;
    setComponents(components, limitRows) {
        const data = limitRows ? components.slice(0, limitRows) : components;
        this.components = data;
        return this;
    }
    addComponent(component) {
        const data = [...this.components, new actionrow_1.ActionRowBuilder().AddComponet(component)];
        this.components = data;
        return this;
    }
    ;
}
exports.ModalBuilder = ModalBuilder;
