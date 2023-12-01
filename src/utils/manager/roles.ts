import { Snowflake } from "discord-api-types/globals";
import { cacheManager } from "./base";
import { Client } from "../../core";
import { GuildRoles } from "../../types";
import { APIRole } from "discord-api-types/v10";
import { Collection } from "@discordjs/collection";

export class RolesManager extends cacheManager<Snowflake, GuildRoles>{
    constructor(client: Client, Iterable?: APIRole[]){
        const roles = (Iterable??[]).map((role)=>new GuildRoles(role, this.client))
        const map: Iterable<readonly [string, GuildRoles]> = roles.map((x) => [x.id, x] as readonly [string, GuildRoles]);
        super(client, map);
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
        if(roles && Array.isArray(roles))  roles.forEach((role)=>{ if(!this.resolve(role)) this.cache.set(role.id, role); });
        return this.cache;
    };

    searchlist(ids: string[]){
        const map = this.cache.map((role)=> { if( ids.includes(role.id)) return role; return undefined }).filter((x)=> x != undefined);
        return map as GuildRoles[];
    };

    setall(Iterable: APIRole[]) {
        if (!this._maps && Array.isArray(Iterable)) {
            this._maps = true;
            
            const roles = (Iterable??[]).map((role)=>new GuildRoles(role, this.client))
            const map: Iterable<readonly [string, GuildRoles]> = roles.map((x) => [x.id, x] as readonly [string, GuildRoles]);
            this.cache.concat(new Collection(map));
        }
        return this.cache;
    }

    get color() {
        const coloredRoles = this.cache.filter(role => role.color);
        if (!coloredRoles.size) return undefined;
        return coloredRoles.reduce((prev: GuildRoles, role) => (role.position> 0 ? role : prev));
      };
    
      get hoist() {
        const hoistedRoles = this.cache.filter(role => role.hoist);
        if (!hoistedRoles.size) return undefined;
        return hoistedRoles.reduce((prev: GuildRoles, role) => (role.position > 0 ? role : prev));
      };
};