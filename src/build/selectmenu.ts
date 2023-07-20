import { APISelectMenuComponent, APISelectMenuOption, ChannelType, ComponentType } from "discord-api-types/v10";

export class SelectMenuBuilder {
    public custom_id?: APISelectMenuComponent['custom_id'];
    public type: APISelectMenuComponent['type'];
    public options: APISelectMenuOption[] = [];
    public channel_types?: ChannelType[];
    public placeholder?: APISelectMenuComponent["placeholder"];
    public min_values?: APISelectMenuComponent["min_values"];
    public max_values?: APISelectMenuComponent["max_values"];
    public disabled?: APISelectMenuComponent["disabled"];

    constructor(options?: {
        custom_id?: APISelectMenuComponent["custom_id"];
        type?: selectMenuType;
        channel_types?: ChannelType[];
        placeholder?: APISelectMenuComponent["placeholder"];
        min_values?: APISelectMenuComponent["min_values"];
        max_values?: APISelectMenuComponent["max_values"];
        disabled?: APISelectMenuComponent["disabled"];
        options?: APISelectMenuOption[];
    }) {
        this.custom_id = options?.custom_id;
        this.SetType( options?.type ?? ComponentType.StringSelect);

        if (options?.type == ComponentType.StringSelect && options?.options) {
            this.save(options.options);
        } else if (options?.type == ComponentType.ChannelSelect) {
            this.channel_types = options?.channel_types;
        }

        this.placeholder = options?.placeholder;
        this.min_values = options?.min_values;
        this.max_values = options?.max_values;
        this.disabled = options?.disabled;
    }

    public SetCustomId(custom: APISelectMenuComponent["custom_id"]): this {
        this.custom_id = custom;
        return this;
    }

    public SetType(type: selectMenuType): this {
        const typeMap: { [key: string]: APISelectMenuComponent["type"] } = {
            "Text": ComponentType.StringSelect,
            "User": ComponentType.UserSelect,
            "Role": ComponentType.RoleSelect,
            "Channels": ComponentType.ChannelSelect,
            "Mentionable": ComponentType.MentionableSelect
        };

        this.type = typeof type === "number" ? type : typeMap[type] ?? 3;
        return this;
    }

    public SetPlaceHolder(text: string): this {
        this.placeholder = text;
        return this;
    }

    public SetOptions(options: APISelectMenuOption[]): this {
        this.options = options;
        return this;
    }

    public AddOptions(options: APISelectMenuOption[]): this {
        this.save(options);
        return this;
    }

    public AddOption(option: APISelectMenuOption): this {
        this.save([option]);
        return this;
    }

    public SetChannelTypes(channel_types: ChannelType[]): this {
        this.channel_types = channel_types;
        return this;
    }

    public SetMinValues(values: APISelectMenuComponent["min_values"]): this {
        this.min_values = typeof values === "number" ? Math.min(values, 25) : undefined;
        return this;
    }

    public SetMaxValues(values: APISelectMenuComponent["max_values"]): this {
        this.max_values = typeof values === "number" ? Math.min(values, 25) : undefined;
        return this;
    }

    public SetDisabled(disabled: APISelectMenuComponent["disabled"]): this {
        this.disabled = disabled;
        return this;
    }

    private save(options?: APISelectMenuOption[]): void {
        if (this.type === 3 && options) {
            this.options.push(...options);
        }
    }
}

type selectMenuType = APISelectMenuComponent["type"] | "Text" | "User" | "Role" | "Channels" | "Mentionable";
