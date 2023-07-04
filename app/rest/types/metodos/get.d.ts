import { Snowflake } from "discord-api-types/globals";
import { Guild } from "../../data/guild";
import { GuildMember } from "../../data/guild/Member";
export interface options {
    guilds: Guild[];
    guild: Guild;
    guildMember: GuildMember;
}
export interface optionslink {
    guilds: [];
    guild: [id: Snowflake];
    guildMember: [guildId: string, id: string];
}
