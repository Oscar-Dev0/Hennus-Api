import { Snowflake } from "discord-api-types/globals";
import { GuildMember, GuildRoles } from "../../types";
import { cacheManager } from "./base";
import { Client } from "../../core";
import { Routes } from "discord-api-types/v10";
import { ReadonlyCollection } from "@discordjs/collection";

export class MemberRolesManager extends cacheManager<Snowflake, GuildRoles> {
    constructor(client: Client, guildId: Snowflake,memberId: Snowflake){
        super(client);
        const data = { member: memberId, guild: guildId };
        Object.defineProperty(this, "data", { value: data });
        //@ts-ignore
        const guild = this.client.guilds.resolve(data.guild);Object.defineProperty(this, "guild", { value: guild });
    };

    async add(id: Snowflake){
        //@ts-ignore
        const data = await this.client.rest.api.put(Routes.guildMemberRole(data.guild, data.member, id));
        if(data instanceof Error) throw data;
        //@ts-ignore
        this.guild.members.add(data);
        //@ts-ignore
        return new GuildMember(data, this.guild, this.client);
    };

    async remove(id: Snowflake){
        //@ts-ignore
        const data = await this.client.rest.api.delete(Routes.guildMemberRole(data.guild, data.member, id));
        if(data instanceof Error) throw data;
        //@ts-ignore
        this.guild.members.add(data);
        //@ts-ignore
        return new GuildMember(data, this.guild, this.client);
    };


    public setall(roles: GuildRoles[]){
        for (const role of roles){
            if(!this.resolve(role)) this.cache.set(role.id, role);
        };
        return this;
    };
};