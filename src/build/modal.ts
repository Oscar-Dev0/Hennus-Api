import { ComponentType } from "discord-api-types/v10";
import { ActionRowBuilder } from "./actionrow";
import { TextInputBuilder } from "./textinput";

export class ModalBuilder {
    public components:Array<ActionRowBuilder>;
    public title?: string;
    public custom_id?: string

    constructor(options?: {
        title: string;
        custom_id: string;
        components: Array<ActionRowBuilder>;
    }) {
        this.title = options?.title;
        this.custom_id = options?.custom_id;
        this.components = [];

        if (options?.components) {
            this.setComponents(options.components);
        };
    };

    setTitle(title: string) {
        this.title = title;
        return this;
    };

    setCustomId(custom: string) {
        this.custom_id = custom;
        return this;
    };

    addTextInputComponents(components: Array<TextInputBuilder>) {
        const data = [...this.components];
        components.forEach((component) => {
            const map = this.components.filter(x => x.components.find(z => { if(z.type !== ComponentType.Button) z.custom_id == component.custom_id}));
            if (!map.length) {
                data.push(new ActionRowBuilder().AddComponet(component));
            }
        });
        this.components = data;
        return this;
    };

    setComponents(components: Array<ActionRowBuilder>, limitRows?: number) {
        const data = limitRows ? components.slice(0, limitRows) : components;
        this.components = data;
        return this;
    }

    addComponent(component: TextInputBuilder) {
        const data = [...this.components, new ActionRowBuilder().AddComponet(component)];
        this.components = data;
        return this;
    };
}
