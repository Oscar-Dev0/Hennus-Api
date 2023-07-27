import { Snowflake } from "discord-api-types/globals";
import { cacheManager } from "./base";
import { Client } from "../../core";
import { GuildRoles } from "../../types";
import { APIRole } from "discord-api-types/v10";

export class RolesManager extends cacheManager<Snowflake, GuildRoles>{
    constructor(client: Client){
        super(client);
    };

    private _maps = false;

    fetch(id: string){
        const cache = this.cache.get(id);
        return cache;
    };

    async fetchall(guildId: Snowflake){
        if(this._maps) return this.cache;
        this._maps = true;
        let roles = await this.rest.get("guildRoles", guildId);
        if(roles && Array.isArray(roles))  for(const role of roles) if(!this.resolve(role)) this.cache.set(role.id, role);

        return this.cache;
    };

    searchlist(ids: string[]){
        const map = this.cache.map((role)=> { if( ids.includes(role.id)) return role; return undefined }).filter((x)=> x != undefined);
        return map as GuildRoles[];
    };

    setall(roles: APIRole[]){
        if(!this._maps && roles && Array.isArray(roles)){
            this._maps = true;
            for(const role of roles){
                const _role = new GuildRoles(role, this.client);
                if(!this.resolve(role.id)) this.cache.set(role.id, _role);
            };
        };
        return this.cache;
    };
};