import { Snowflake } from "discord-api-types/globals";
import { APIChannel, APIGuild, APIGuildMember, APIMessage, APIRole, APIUser, RESTPatchAPIGuildJSONBody, Routes } from "discord-api-types/v10";
import { Channel, Guild, GuildMember, GuildRoles, Message, User } from "../../../types";

export interface getReturn {
    user: APIUser;
    userGuilds: Pick<APIGuild, "owner" | "name" | "id" | "icon" | "permissions" | "features">[];
    guild: APIGuild;
    guildMember: APIGuildMember;
    guildMembers: APIGuildMember[];
    guildChannels: APIChannel[];
    guildRoles: APIRole[];
    channelMessage: APIMessage;
    channelMessages: APIMessage[];
};

export interface getOptions {
    user: [ userId?: Snowflake ];
    userGuilds: [];
    guild: [id: Snowflake];
    guildMember: [guildId: Snowflake, memberId: Snowflake];
    guildMembers: [ guildId: Snowflake ];
    guildRoles: [ guildId: string ];
    guildChannels: [ guildId: Snowflake ];
    channelMessage: [ cahnnelId: Snowflake, messageId: Snowflake ];
    channelMessages: [ cahnnelId: Snowflake ];
};

interface getLink {
    /**@types `/users/@me` |  `/users/${user.id}`*/
    user: `/users/${string}`;
    userGuilds: `/users/@me/guilds`;
    guild: `/guilds/${string}`;
    guildMember: `/guilds/${string}/members/${string}`;
    guildMembers: `/guilds/${string}/members`;
    guildRoles: `/guilds/${string}/roles`;
    guildChannels: `/guilds/${string}/channel`;
    channelMessage: `/channels/${string}/messages/${string}`;
    channelMessages: `/channels/${string}/messages`;
};



interface type<T extends keyof getOptions> {
    op: T;
    d: getOptions[T];
    link: getLink[T];
};

export function GetRoutes<T extends keyof getOptions, D extends type<T>>( type: D["op"], ...args: D["d"] ): D["link"] {
    Routes.guildRoles
    const router = Routes[type];
    //@ts-ignore
    return router(...args) as D["link"];

};


export interface getNode {
    user: { return: User, data: getOptions["user"] };
    userGuilds:{ return: Pick<APIGuild, "owner" | "name" | "id" | "icon" | "permissions" | "features"> [], data: getOptions["userGuilds"] };
    guildChannels: {return: Channel[], data: getOptions['guildChannels'] };
    guild: { return: Guild, data: getOptions['guild'] };
    guildMember: { return: GuildMember, data: getOptions['guildMember'] };
    guildMembers: { return: GuildMember[], data: getOptions['guildMembers']};
    guildRoles: { return: GuildRoles[], data: getOptions['guildRoles'] }
    channelMessage: { return: Message, data: getOptions['channelMessage'] };
    channelMessages: { return: Message[], data: getOptions['channelMessages'] };
};