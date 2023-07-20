import { ComponentType } from "discord-api-types/v10";
import { ActionRowBuilder } from "./actionrow";
import { TextInputBuilder } from "./textinput";

export class ModalBuilder {
    public components: Array<ActionRowBuilder>;
    public title?: string;
    public custom_id?: string;

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
        }
    }

    public setTitle(title: string): this {
        this.title = title;
        return this;
    }

    public setCustomId(custom_id: string): this {
        this.custom_id = custom_id;
        return this;
    }

    public addTextInputComponents(components: Array<TextInputBuilder>): this {
        for (const component of components) {
            if (!this.findComponentById(component.custom_id?? "", ComponentType.Button)) {
                this.components.push(new ActionRowBuilder().AddComponent(component));
            }
        }
        return this;
    }

    public setComponents(components: Array<ActionRowBuilder>, limitRows?: number): this {
        const data = limitRows ? components.slice(0, limitRows) : components;
        this.components = data;
        return this;
    }

    public addComponent(component: TextInputBuilder): this {
        this.components.push(new ActionRowBuilder().AddComponent(component));
        return this;
    }

    private findComponentById(customId: string, type: ComponentType): ActionRowBuilder | undefined {
        return this.components.find((actionRow) => actionRow.components.some((comp) => comp.type === type && comp.custom_id === customId));
    }
}
