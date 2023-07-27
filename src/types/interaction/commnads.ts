import {
    APIApplicationCommandAutocompleteInteraction,
    APIApplicationCommandInteraction,
    APIApplicationCommandInteractionDataBasicOption,
    APIApplicationCommandInteractionDataSubcommandOption,
    APIChatInputApplicationCommandInteractionData,
    APIMessageApplicationCommandInteractionData,
    APIUserApplicationCommandInteractionData,
    ApplicationCommandOptionType,
    ApplicationCommandType,
    Snowflake,
} from "discord-api-types/v10";
import { BasedInteraction } from "../base/interaction";
import { Client } from "../../core";
import { User } from "../user";
import { GuildRoles } from "../guild";
import { Channel } from "../channel";

export class InteractionCommands extends BasedInteraction {
    public cmdData:
        | APIChatInputApplicationCommandInteractionData
        | APIUserApplicationCommandInteractionData
        | APIMessageApplicationCommandInteractionData
        | APIChatInputApplicationCommandInteractionData;
    public commandName: string;
    public commandId: string;
    public commandType: ApplicationCommandType;

    constructor(
        data: APIApplicationCommandInteraction | APIApplicationCommandAutocompleteInteraction,
        client: Client
    ) {
        super(data, client);
        this.cmdData = data.data;
        this.commandName = this.cmdData.name;
        this.commandId = this.cmdData.id;
        this.commandType = this.cmdData.type;
    };

    get options() {
        return {
            attachment: (name: string) => this.find("attachment", name),
            boolean: (name: string) => this.find("boolean",name),
            channel: (name: string) => this.find("channel", name),
            integer: (name: string) => this.find("integer", name),
            mentionable: (name: string) => this.find("mentionable", name),
            number: (name: string) => this.find("number", name),
            role: (name: string) => this.find("role", name),
            string: (name: string) => this.find("string", name),
            subCommand: this.find("subcommand"),
            subCommandGroup: this.find("subcommandGroup"),
            user: (name: string) => this.find("user", name),
        };
    };
    
    private find<T extends options["type"]>(type: T, find?: string): Extract<options, { type: T }>["return"] {
        const typeMapping: { [K in options["type"]]: ApplicationCommandOptionType } = {
            number: ApplicationCommandOptionType.Number,
            integer: ApplicationCommandOptionType.Integer,
            string: ApplicationCommandOptionType.String,
            boolean: ApplicationCommandOptionType.Boolean,
            attachment: ApplicationCommandOptionType.Attachment,
            channel: ApplicationCommandOptionType.Channel,
            role: ApplicationCommandOptionType.Role,
            mentionable: ApplicationCommandOptionType.Mentionable,
            user: ApplicationCommandOptionType.User,
            subcommand: ApplicationCommandOptionType.Subcommand,
            subcommandGroup: ApplicationCommandOptionType.SubcommandGroup
        };
    
        if (type === "subcommandGroup") return this.datas("subcommandGroup") as any
        else if(type === "subcommand") return (this.datas("subcommand") ?? []) as any;
    
        const data = this.datas("null") ?? [];
        const finds = data.find((s) => s.name === find);
    
        if (!type || !finds || finds.type !== typeMapping[type]) return undefined as any;
        
    
        if (type === "channel") {
            const channel = this.client.channels.resolve(finds.value as string);
            return { id: finds.value, channel } as any;
        } else if (type === "role") {
            const role = this.guild.roles.cache.get(finds.value as string);
            return { id: finds.value, role } as any;
        } else if (type === "user") {
            const user = this.client.users.resolve(finds.value as string);
            return { id: finds.value, user } as any;
        }
    
        return finds.value as any;
    };
    
    private datas<T extends datas["type"]>(type: T): Extract<datas, { type: T }>["return"] {
        const data = this.cmdData;
        if (data.type !== ApplicationCommandType.ChatInput) return [] as any;
        let datos = data.options ?? [];
    
        if (datos[0].type === ApplicationCommandOptionType.SubcommandGroup) {
            if (type === "subcommandGroup") return [datos[0].name, datos[0].options] as any;
            datos = datos[0].options;
        }; 
        if (datos[0].type === ApplicationCommandOptionType.Subcommand) {
            if (type === "subcommand") return [datos[0].name, datos[0].options ?? []] as any;
            return (datos[0].options ?? []) as any;
        };
        return datos as any;
    };
    toString() {
        if(this.commandName && this.commandId) return `</${this.commandName}:${this.commandId}>`;
        else return "";
    };
    

};

type options =
    | { type: "string"; return: string }
    | { type: "integer" | "number"; return: number }
    | { type: "boolean"; return: boolean }
    | { type: "user"; return: { id: Snowflake; user?: User } }
    | { type: "channel"; return: { id: Snowflake; channel?: Channel } }
    | { type: "role"; return: { id: Snowflake; role?: GuildRoles } }
    | { type: "mentionable"; return: Snowflake }
    | { type: "attachment"; return: Snowflake }
    | { type: "subcommandGroup"; return: subcommandGroup["return"] }
    | { type: "subcommand"; return: subcommand["return"] };

type datas = subcommand | subcommandGroup | gruponull;

interface subcommand {
    type: "subcommand";
    return: [name: string, options: APIApplicationCommandInteractionDataBasicOption[]];
}

interface subcommandGroup {
    type: "subcommandGroup";
    return: [name: string, options: APIApplicationCommandInteractionDataSubcommandOption[]];
}

interface gruponull {
    type: "null";
    return: APIApplicationCommandInteractionDataBasicOption[];
}
