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

    public options = new Options(this);

    toString() {
        if(this.commandName && this.commandId) return `</${this.commandName}:${this.commandId}>`;
        else return "";
    };

};


class Options {
    private data: InteractionCommands;
    
    constructor(data: InteractionCommands){
        Object.defineProperty(this, "data", { value: data });
    };

    public get(name: string, required: boolean){
        const data = this.datas("null");
        const find = data.find((d)=> d.name == name);
        if(required && find) return find;
        else return find;
    };

    public getString<R extends boolean = false>(name: string, required?: R): OPString<R>{
        const data = this.find("string", name);
        if(required) return data as any;
        else return (data ?? undefined) as any;
    };

    public getInteger<R extends boolean = false>(name: string, required?: R): OPInteger<R>{
        const data = this.find("integer", name);
        if(required) return data as any;
        else return (data ?? undefined) as any;
    };

    public getNumber<R extends boolean = false>(name: string, required?: R): OPNumber<R>{
        const data = this.find("number", name);
        if(required) return data as any;
        else return (data ?? undefined) as any;
    };

    public getBoolean<R extends boolean = false>(name: string, required?: R): OPBoolean<R>{
        const data = this.find("boolean", name);
        if(required) return data as any;
        else return (data ?? undefined) as any;
    };

    public getUser<R extends boolean = false>(name: string, required?: R): OPUser<R>{
        const data = this.find("user", name);
        if(required) return data as any;
        else return (data ?? undefined) as any;
    };

    public getChannel<R extends boolean = false>(name: string, required?: R): OPChannel<R>{
        const data = this.find("channel", name);
        if(required) return data as any;
        else return (data ?? undefined) as any;
    };

    public getRole<R extends boolean = false>(name: string, required?: R): OPRole<R>{
        const data = this.find("role", name);
        if(required) return data as any;
        else return (data ?? undefined) as any;
    };

    public getMentionable<R extends boolean = false>(name: string, required?: R): OPMentionable<R>{
        const data = this.find("mentionable", name);
        if(required) return data as any;
        else return (data ?? undefined) as any;
    };

    public getAttachment<R extends boolean = false>(name: string, required?: R): OPAttachment<R>{
        const data = this.find("attachment", name);
        if(required) return data as any;
        else return (data ?? undefined) as any;
    };

    get subCommand(){
        return this.find("subcommand");
    };

    get subCommandGroup(){
        return this.find("subcommandGroup");
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
            const channel = this.data.client.channels.resolve(finds.value as string);
            return { id: finds.value, channel, name: finds.name, type: finds.type } as any;
        } else if (type === "role") {
            const role = this.data.guild.roles.cache.get(finds.value as string);
            return { id: finds.value, role, name: finds.name, type: finds.type } as any;
        } else if (type === "user") {
            const user = this.data.client.users.resolve(finds.value as string);
            return { id: finds.value, user, name: finds.name, type: finds.type } as any;
        }
    
        return { name: finds.name, type: finds.type, value: finds.value } as any;
    };
    
    private datas<T extends datas["type"]>(type: T): Extract<datas, { type: T }>["return"] {
        const data = this.data.cmdData;
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
        if(type === "subcommand" || type === "subcommandGroup") return [] as any;
        return datos as any;
    };

};

type OPString<R extends boolean = false> = R extends true ? Extract<options, {type: "string"}>["return"] : Extract<options, {type: "string"}>["return"] | undefined;
type OPInteger<R extends boolean = false> = R extends true ? Extract<options, {type: "integer"}>["return"] : Extract<options, {type: "integer"}>["return"] | undefined;
type OPNumber<R extends boolean = false> = R extends true ? Extract<options, {type: "number"}>["return"] : Extract<options, {type: "number"}>["return"] | undefined;
type OPBoolean<R extends boolean = false> = R extends true ? Extract<options, {type: "boolean"}>["return"] : Extract<options, {type: "boolean"}>["return"] | undefined;
type OPUser<R extends boolean = false> = R extends true ? Extract<options, {type: "user"}>["return"] : Extract<options, {type: "user"}>["return"] | undefined;
type OPChannel<R extends boolean = false> = R extends true ? Extract<options, {type: "channel"}>["return"] : Extract<options, {type: "channel"}>["return"] | undefined;
type OPRole<R extends boolean = false> = R extends true ? Extract<options, {type: "role"}>["return"] : Extract<options, {type: "role"}>["return"] | undefined;
type OPMentionable<R extends boolean = false> = R extends true ? Extract<options, {type: "mentionable"}>["return"] : Extract<options, {type: "mentionable"}>["return"] | undefined;
type OPAttachment<R extends boolean = false> = R extends true ? Extract<options, {type: "attachment"}>["return"] : Extract<options, {type: "attachment"}>["return"] | undefined;


type options =
    | { type: "string"; return: { name: string, type: ApplicationCommandOptionType.String, value: string } }
    | { type: "number"; return: { name: string, type: ApplicationCommandOptionType.Number , value: number } }
    | { type: "integer"; return: { name: string, type: ApplicationCommandOptionType.Integer, value: number } }
    | { type: "boolean"; return: { name: string, type: ApplicationCommandOptionType.Boolean, value: boolean } }
    | { type: "user"; return: { name: string, type: ApplicationCommandOptionType.User, id: Snowflake; user?: User } }
    | { type: "channel"; return: { name: string, type: ApplicationCommandOptionType.Channel, id: Snowflake; channel?: Channel } }
    | { type: "role"; return: { name: string, type: ApplicationCommandOptionType.Role, id: Snowflake; role?: GuildRoles,  } }
    | { type: "mentionable"; return: { name: string, type: ApplicationCommandOptionType.Mentionable, value: Snowflake } }
    | { type: "attachment"; return: { name: string, type: ApplicationCommandOptionType.Attachment, value: string } }
    | { type: "subcommandGroup"; return: subcommandGroup["return"] }
    | { type: "subcommand"; return: subcommand["return"] };

type datas = subcommand | subcommandGroup | gruponull;

interface subcommand {
    type: "subcommand";
    return: [name: string, options: APIApplicationCommandInteractionDataBasicOption[]];
};

interface subcommandGroup {
    type: "subcommandGroup";
    return: [name: string, options: APIApplicationCommandInteractionDataSubcommandOption[]];
};

interface gruponull {
    type: "null";
    return: APIApplicationCommandInteractionDataBasicOption[];
};