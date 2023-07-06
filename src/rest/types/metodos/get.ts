import { Snowflake } from "discord-api-types/globals";
import { APIGuild, APIGuildMember, APIMessage, Routes } from "discord-api-types/v10";
import { Guild, Message } from "../../../types";

export interface getReturn {
    userGuilds: APIGuild[];
    guild: APIGuild;
    guildMember: APIGuildMember;
    guildMembers: APIGuildMember[];
    channelMessages: APIMessage[];
};

export interface getOptions {
    userGuilds: [];
    guild: [id: Snowflake];
    guildMember: [guildId: Snowflake, memberId: Snowflake];
    guildMembers: [ guildId: Snowflake ];
    channelMessages: [ cahnnelId: Snowflake ];
};

interface getLink {
    userGuilds: `/users/@me/guilds`;
    guild: `/guilds/${string}`;
    guildMember: `/guilds/${string}/members/${string}`;
    guildMembers: `/guilds/${string}/members`;
    channelMessages: `/channels/${string}/messages`
};



interface type<T extends keyof getOptions> {
    op: T;
    d: getOptions[T];
    link: getLink[T];
};

export function GetRoutes<T extends keyof getOptions, D extends type<T>>( type: D["op"], ...args: D["d"] ): D["link"] {
    Routes.channelMessages
    const router = Routes[type];
    //@ts-ignore
    return router(...args) as D["link"];

};


export interface getNode {
    userGuilds:{ return: Guild[], data: getOptions["userGuilds"] };
    guild: { return: Guild, data: getOptions['guild'] };
    guildMember: { return: APIGuildMember, data: getOptions['guildMember'] };
    guildMembers: { return: APIGuildMember[], data: getOptions['guildMembers']};
    channelMessages: { return: Message[], data: getOptions['channelMessages'] };
};