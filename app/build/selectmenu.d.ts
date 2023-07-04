import { APISelectMenuComponent, APISelectMenuOption, ChannelType } from "discord-api-types/v10";
export declare class SelectMenuBuilder {
    custom_id?: APISelectMenuComponent['custom_id'];
    type: APISelectMenuComponent['type'];
    options: APISelectMenuOption[];
    channel_types?: ChannelType[];
    placeholder?: APISelectMenuComponent["placeholder"];
    min_values?: APISelectMenuComponent["min_values"];
    max_values?: APISelectMenuComponent["max_values"];
    disabled?: APISelectMenuComponent["disabled"];
    constructor(options?: APISelectMenuComponent);
    SetCustomId(custom: APISelectMenuComponent["custom_id"]): this;
    SetType(type: selectMenuType): this;
    setPlaceHolder(text: string): this;
    /**
     * @description
     * funcion carga directamente las opciones al cache
     * @description
     * esta funcion solo va con el tipo 3 es un menu de texto
     */
    SetOptions(options: APISelectMenuOption[]): this;
    /**
     * @description
     * esta funcion carga las opciones ya al cache que existe en el slectmenu.
     * @description
     * esta funcion solo va con el tipo 3 es un menu de texto.
     */
    AddOptions(options: APISelectMenuOption[]): this;
    AddOption(option: APISelectMenuOption): this;
    /**
     * @description
     * esta funcion solo va con el tipo 8 es un menu de texto.
     */
    SetChannelTypes(channel_types: ChannelType[]): this;
    SetMinValues(values: APISelectMenuComponent["min_values"]): this;
    SetMaxValues(values: APISelectMenuComponent["max_values"]): this;
    SetDisabled(boolean: APISelectMenuComponent["disabled"]): this;
    private save;
}
type selectMenuType = APISelectMenuComponent["type"] | "Text" | "User" | "Role" | "Channels" | "Mentionable";
export {};
