import { APIGuildMember } from "discord-api-types/v10";
import { Guild } from ".";
import { Client } from "../../../core";
import { BaseData } from "../../base/data";
export declare class GuildMember extends BaseData {
    private dataMember;
    guild: Guild;
    constructor(member: APIGuildMember, guild: Guild, client: Client);
}
