import { Snowflake } from "discord-api-types/globals";
import { Client } from "../../core";
import { cacheManager } from "./base";
import { Guild } from "../../types";

export class GuildsManager extends cacheManager<string, Guild> {
    constructor(client: Client) {
        super(client);
    };

   async fetch(id: Snowflake, data?: { force?: boolean }){
        const cache = this.cache.get(id);
        if(data && data.force){
            const guild = await this.rest.get("guild", id);
            if(!cache && guild) this.cache.set(id, guild);
            return guild;
        };
        return cache;
    };
    
};