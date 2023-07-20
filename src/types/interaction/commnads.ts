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
    };

    get options() {
        const data = this.find;
        return {
            attachment: (name: string) => data(name, "attachment"),
            boolean: (name: string) => data(name, "boolean"),
            channel: (name: string) => data(name, "channel"),
            integer: (name: string) => data(name, "integer"),
            mentionable: (name: string) => data(name, "mentionable"),
            number: (name: string) => data(name, "number"),
            role: (name: string) => data(name, "role"),
            string: (name: string) => data(name, "string"),
            subCommand: (name: string) => data(name, "subcommand"),
            subCommandGroup: (name: string) => data(name, "subcommandGroup"),
            user: (name: string) => data(name, "user"),
        };
    };
    
    private find<T extends options["type"]>(find: string, type: T): Extract<options, { type: T }>["return"] {
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
    
        if (type === "subcommandGroup" || type === "subcommand") {
            //@ts-ignore
            return this.datas(typeMapping[type]) as any;
        };
    
        const data = this.datas("null") ?? [];
        const finds = data.find((s) => s.name === find);
    
        if (!type || !finds || finds.type !== typeMapping[type]) return {} as any;
        
    
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
            if (datos[0].type === type) return [datos[0].name, datos[0].options] as any;
            datos = datos[0].options;
        };
    
        if (datos[0].type === ApplicationCommandOptionType.Subcommand) {
            if (datos[0].type === type) return [datos[0].name, datos[0].options ?? []] as any;
            return (datos[0].options ?? []) as any;
        };
    
        return [] as any;
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
    type: ApplicationCommandOptionType.Subcommand;
    return: [name: string, options: APIApplicationCommandInteractionDataBasicOption[]];
}

interface subcommandGroup {
    type: ApplicationCommandOptionType.SubcommandGroup;
    return: [name: string, options: APIApplicationCommandInteractionDataSubcommandOption[]];
}

interface gruponull {
    type: "null";
    return: APIApplicationCommandInteractionDataBasicOption[];
}
