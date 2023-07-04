import { APIGuildMember } from "discord-api-types/v10";
import { Guild } from ".";
import { Client } from "../../../core";
import { BaseData } from "../../base/data";

export class GuildMember extends BaseData {

    private dataMember: APIGuildMember;
    guild: Guild;

    constructor(member: APIGuildMember, guild: Guild, client: Client){
        super(client);
        this.guild = guild;
        this.dataMember = member;
    };

};