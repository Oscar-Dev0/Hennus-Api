import { Snowflake } from "discord-api-types/globals";
import { Guild, GuildMember } from "../../../types";

export interface options {
    guilds: Guild[];
    guild: Guild;
    guildMember: GuildMember;
    
    
};

export interface optionslink {
    guilds: [];
    guild: [ id: Snowflake ];
    guildMember: [ guildId: string, id: string ];
};