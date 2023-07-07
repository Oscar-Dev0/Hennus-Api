import { WebSocketManager, WebSocketShardEvents } from "@discordjs/ws";
import { Client, EventsString } from "../core";
import { REST } from "@discordjs/rest";
import { APIChannel, ChannelType, GatewayDispatchEvents } from "discord-api-types/v10";
import { BasedCategoryChannel, BasedDmChannel, BasedForumChannel, BasedTextChannel, BasedThreadChannel, BasedVoiceChannel, Channel, Guild, Ready } from "../types";

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
                const ready = new Ready(data.d, this.client);

                for (let index = 0; index < data.d.guilds.length; index++) {
                    if(index > 100) continue;
                    const element = data.d.guilds[index];
                    let guild;

                    if(element.unavailable) guild = await this.client.rest.get("guild", element.id);
                    if(guild) this.client.guilds.set(guild.id, guild);
                };

                if(!this.client.id) this.client.setUser(ready.user);
                if(!this.client.aplicationId) this.client.setAplication(data.d.application.id);

                this.client.emit("Ready", ready);
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
                let channel: Channel | undefined = undefined;

                if(data.d.type == ChannelType.GuildText || data.d.type == ChannelType.GuildAnnouncement) channel = new BasedTextChannel(data.d, this.client);
                else if(data.d.type == ChannelType.DM || data.d.type == ChannelType.GroupDM) channel = new BasedDmChannel(data.d, this.client);
                else if(data.d.type == ChannelType.GuildVoice || data.d.type == ChannelType.GuildStageVoice) channel = new BasedVoiceChannel(data.d, this.client);
                else if(data.d.type == ChannelType.GuildCategory) channel = new BasedCategoryChannel(data.d, this.client);
                else if(data.d.type == ChannelType.GuildForum) channel = new BasedForumChannel(data.d, this.client);
                else if(data.d.type == ChannelType.PublicThread || data.d.type == ChannelType.PrivateThread || data.d.type == ChannelType.AnnouncementThread) channel = new BasedThreadChannel(data.d, this.client);

                if(channel){
                    const cache = this.client.channels.get(channel.id);
                    if(data.t == GatewayDispatchEvents.ChannelCreate) {
                        this.client.channels.set(channel.id, channel);
                        this.client.emit('ChannelCreate', channel);
                    };
                    if(data.t == GatewayDispatchEvents.ChannelDelete) {
                        this.client.emit('ChannelDelete', channel);
                        if( cache ) this.client.channels.delete(channel.id);
                    };
                    if(data.t == GatewayDispatchEvents.ChannelUpdate) {
                        if(!cache) this.client.channels.set(channel.id, channel);
                        if(cache){
                            this.client.channels.delete(channel.id);
                            this.client.channels.set(channel.id, channel);
                        };
                        this.client.emit('ChannelUpdate', channel);
                    };
                };
            } else if(data.t == GatewayDispatchEvents.MessageCreate){
                data.d
            };
        })
    }
};