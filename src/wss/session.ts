import { WebSocketManager, WebSocketShardEvents } from "@discordjs/ws";
import { Client, EventsString } from "../core";
import { REST } from "@discordjs/rest";
import { APIChannel, ChannelType, GatewayDispatchEvents, GatewayDispatchPayload, GatewayIntentBits } from "discord-api-types/v10";
import { BasedCategoryChannel, BasedDmChannel, BasedForumChannel, BasedTextChannel, BasedThreadChannel, BasedVoiceChannel, Channel, Guild, Message, Ready } from "../types";

export class WebSession extends WebSocketManager {

    private client: Client;

    constructor(client: Client, rest: REST){
        super({
            token: client.token,
            intents: client.intents.bitfield,
            rest,
        });
        Object.defineProperty(this, "client", {
            value: client,
        });
    };


   async Handler(data: GatewayDispatchPayload){
    console.log(data.t)
        if (data?.t === GatewayDispatchEvents.Ready){
            const ready = new Ready(data.d, this.client);

            if(!this.client.intents.has(GatewayIntentBits.Guilds)){

            for (let index = 0; index < data.d.guilds.length; index++) {
                if(index > 100) continue;
                const element = data.d.guilds[index];
                const channels = await this.client.rest.get("guildChannels", element.id);
                let guild;
                
                if(element.unavailable) guild = await this.client.rest.get("guild", element.id);
                if(channels) {
                    if(guild) guild.channels.setall(channels);
                    this.client.channels.setall(channels);
                };
                if(guild) this.client.guilds.set(guild.id, guild);

            };
        };

            if(!this.client.id) this.client.setUser(ready.user);
            if(!this.client.aplicationId) this.client.setAplication(data.d.application.id);

            this.client.emit("Ready", ready);
        } else if( data.t == GatewayDispatchEvents.GuildCreate || data.t == GatewayDispatchEvents.GuildUpdate ){
            const guild = new Guild(data.d, this.client);
            const cache = this.client.guilds.get(guild.id);
            const channels = await this.client.rest.get("guildChannels", guild.id);
            if(!cache && channels) {
                guild.channels.setall(channels);
                this.client.channels.setall(channels);
            };
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
        } else if(data.t == GatewayDispatchEvents.MessageCreate ){
            const message = new Message(data.d, this.client);
            this.client.emit("MessageCreate", message);

            const channel = message.channel;
            if(channel && ( channel.isChannelText() || channel.isChannelVoice())) channel.setlast(message.id);
            if(channel && ( channel.isChannelthread() || channel.isChannelForum() || channel.isChannelDm())) channel.setLast({msg: message.id});
            if(channel && ( channel.isChannelthread() || channel.isChannelForum() || channel.isChannelDm() || channel.isChannelText() || channel.isChannelVoice())) channel.messages.set(message.id, message);
        } else if(data.t == GatewayDispatchEvents.MessageDelete){
            const channel = this.client.channels.get(data.d.channel_id);
            let msg: Message | undefined;
            if(channel && ( channel.isChannelthread() || channel.isChannelForum() || channel.isChannelDm() || channel.isChannelText() || channel.isChannelVoice())) msg = channel.messages.get(data.d.id);
            if(msg){
                this.client.emit("MessageDelete", msg);
                if(channel && ( channel.isChannelthread() || channel.isChannelForum() || channel.isChannelDm() || channel.isChannelText() || channel.isChannelVoice())) channel.messages.delete(data.d.id);
            };
        } else if(data.t == GatewayDispatchEvents.MessageUpdate){
            const New_msg = new Message(data.d, this.client);
            const channel = this.client.channels.get(data.d.channel_id);
            let Old_msg: Message | undefined;
            if(channel && ( channel.isChannelthread() || channel.isChannelForum() || channel.isChannelDm() || channel.isChannelText() || channel.isChannelVoice())) Old_msg = channel.messages.get(data.d.id);
            this.client.emit("MessageUpdate", New_msg, Old_msg);
            if(channel && ( channel.isChannelthread() || channel.isChannelForum() || channel.isChannelDm() || channel.isChannelText() || channel.isChannelVoice())){
                if(Old_msg) channel.messages.delete(data.d.id);
                channel.messages.set(data.d.id, New_msg);
            };
        };
};
};