import { Snowflake } from "discord-api-types/globals";
import { Client } from "../../core";
import { Guild, GuildMember, User } from "../../types";
import { cacheManager } from "./base";
import { APIGuildMember } from "discord-api-types/v10";

export class MembersManager extends cacheManager<string, GuildMember> {
    constructor(client: Client, private guildId: Snowflake) {
        super(client);
        Object.defineProperty(this, "guildId", { value: guildId });
    };

    private _maps = false;

    async fetch(id: Snowflake, options?: { force?: false } | { force?: true, guildId?: Snowflake }) {
        const cache = this.cache.get(id);
        if (options?.force) {
            const member = await this.rest.get("guildMember", options.guildId ?? this.guildId, id);
            if (!cache && member) this.cache.set(id, member);
            return member;
        } else return cache;
    };

    async fetchall() {
        if(this._maps) return this.cache;
        this._maps = true;
        const members = await this.rest.get("guildMembers", this.guildId) ?? [];
        members.forEach((member)=>{
            const user = member.user;     
            if(user){
                if(!this.cache.has(user.id)) this.cache.set(user.id, member);
                if(!this.client.users.resolve(user.id)) this.client.users.cache.set(user.id, user);
            };
        });
        return this.cache;
    };

    setall(members: APIGuildMember[], guild: Guild): Map<string, GuildMember> {
        if (!this._maps && Array.isArray(members)) {
            this._maps = true;
            
            members.forEach((member) => {
                const user = member.user;     
                if (user) {
                    if (!this.cache.has(user.id)) {
                        this.cache.set(user.id, new GuildMember(member, guild, this.client));
                    }
                    if (!this.client.users.resolve(user.id)) {
                        this.client.users.cache.set(user.id, new User(user, this.client));
                    }
                }
            });
        }
        return this.cache;
    }
    

    add(member: GuildMember){
        const cache = this.resolve(member.user?.id ?? "");
        if( member.user && cache){
            this.cache.delete(member.user?.id);
            this.cache.set(member.user.id, member);
        } else if(member.user) this.cache.set(member.user.id, member);
        return this;
    };
};