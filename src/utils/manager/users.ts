
import { User } from "../../types";
import { Client } from "../../core";
import { Snowflake } from "discord-api-types/globals";
import { cacheManager } from "./base";

export class UsersManager extends cacheManager<string, User> {


    constructor( client: Client ) {
        super(client);
    };

    update(user: User){
        if(this.cache.has(user.id)) this.cache.delete(user.id);
        this.cache.set(user.id, user);
    };

    async fetch(id: Snowflake, data?: { force?: boolean }){
        const cache = this.cache.get(id);
        if(data && data.force){
            const user = await this.rest.get("user", id);
            if(!cache && user) this.cache.set(user.id, user);
            return user;
        };
        return cache;
    };
    

};