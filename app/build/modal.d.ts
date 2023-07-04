import { ActionRowBuilder } from "./actionrow";
import { TextInputBuilder } from "./textinput";
export declare class ModalBuilder {
    components: Array<ActionRowBuilder>;
    title?: string;
    custom_id?: string;
    constructor(options?: {
        title: string;
        custom_id: string;
        components: Array<ActionRowBuilder>;
    });
    setTitle(title: string): this;
    setCustomId(custom: string): this;
    addTextInputComponents(components: Array<TextInputBuilder>): this;
    setComponents(components: Array<ActionRowBuilder>, limitRows?: number): this;
    addComponent(component: TextInputBuilder): this;
}
