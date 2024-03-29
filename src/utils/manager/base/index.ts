import { Collection } from "@discordjs/collection";
import { Client } from "../../../core";
import { Snowflake } from "discord-api-types/globals";


export class cacheManager<T, V> {
    private _cache: Collection<T, V>;
    constructor(public readonly client: Client, iterable?: Iterable<readonly [T, V]> | null | undefined){
        Object.defineProperty(this, "client", {value: client});
        this._cache = new Collection(iterable);
    };

    get rest(){
        return this.client.rest;
    };

    get cache(){
        return this._cache;
    };

    resolve(data: T | V ): V | undefined{
        if(!data) return undefined;
        //@ts-ignore
        if (typeof data === 'object'  && this.cache.get(data.id)) return this.cache.get(data.id) as V;
        //@ts-ignore
        if (typeof data === "string" && this.cache.get(data)) return this.cache.get(data) as V;
        return undefined;
    };

    
};