import { APIGuildMember } from "discord-api-types/v10";
import { BaseData } from "../../base";
import { Guild } from ".";
import { Client } from "../../../core";
export declare class GuildMember extends BaseData {
    private dataMember;
    guild: Guild;
    constructor(member: APIGuildMember, guild: Guild, client: Client);
}
