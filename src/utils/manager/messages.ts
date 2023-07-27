
import { Message } from "../../types";
import { cacheManager } from "./base";
import { Snowflake } from "discord-api-types/globals";
import { Client } from "../../core";

export class MessagesManager extends cacheManager<Snowflake, Message> {

    constructor(client: Client){
        super(client);
    };

    public search = false;

    async fetch(id: string, options?: force){
            const cache = this.cache.get(id);
            if(options?.force){
                const message = await this.rest.get("channelMessage", options.channelId, id);
                if( !cache && message ) this.cache.set(message.id, message);
                return message;
            };
            return cache;
    };

    async fetchall( channelId: string){
            if(!this.search) this.rest.get("channelMessages", channelId).then((msgs)=>{ this.search = true; for(const msg of msgs ?? []) this.cache.set(msg.id, msg)});
            return this.cache;
    };

    update(message: Message){
        if (this.cache.has(message.id)){
            const oldMessage = this.cache.get(message.id);
            if(message.editedTimestamp !== oldMessage?.editedTimestamp){
                this.cache.delete(message.id);
                this.cache.set(message.id, message);
            };
        } else {
            this.cache.set(message.id, message);
        };
        return this;
    };
};


type force = { force: true, channelId: Snowflake } | { force: false };