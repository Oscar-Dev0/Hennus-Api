import { WebSocketManager, WebSocketShardEvents } from "@discordjs/ws";
import { Client, EventsString } from "../core";
import { REST } from "@discordjs/rest";
import { GatewayDispatchEvents } from "discord-api-types/v10";
import { Guild, Ready } from "../types";

export class WebSession extends WebSocketManager {

    private client: Client;

    constructor(client: Client, rest: REST){
        super({
            token: client.token,
            intents: client.intents,
            rest,
        });
        Object.defineProperty(this, "client", {
            value: client,
        });
    };

    handler(){
        this.on(WebSocketShardEvents.Dispatch, async ({ data, shardId })=>{
            if (data?.t === GatewayDispatchEvents.Ready){
                this.client.emit("Ready", new Ready(data.d, this.client))
            } else if( data.t == GatewayDispatchEvents.GuildCreate || data.t == GatewayDispatchEvents.GuildUpdate ){
                const guild = new Guild(data.d, this.client);
                const cache = this.client.guilds.get(guild.id);
                if(!cache) this.client.guilds.set(guild.id, guild);
                if(data.t == GatewayDispatchEvents.GuildUpdate){
                    if(cache) {
                        this.client.guilds.delete(cache.id);
                        this.client.guilds.set(data.d.id, guild)
                    };
                    this.client.emit("GuildUpdate", guild);
                } else{
                    this.client.emit("GuildCreate", guild);
                };
            } else if(data.t == GatewayDispatchEvents.GuildDelete){
                const cache = this.client.guilds.get(data.d.id);
                if(cache){
                    this.client.emit("GuildDelete", cache);
                    this.client.guilds.delete(cache.id);
                };
            } else if(data.t == GatewayDispatchEvents.ChannelCreate || data.t == GatewayDispatchEvents.ChannelUpdate || data.t == GatewayDispatchEvents.ChannelDelete){
                data.d
            };
        })
    }
};