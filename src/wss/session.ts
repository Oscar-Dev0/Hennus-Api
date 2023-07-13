import { WebSocketManager, WebSocketShardEvents } from "@discordjs/ws";
import { Client, EventsString } from "../core";
import { REST } from "@discordjs/rest";
import { APIChannel, ChannelType, GatewayDispatchEvents, GatewayDispatchPayload, GatewayIntentBits, GatewayReadyDispatchData } from "discord-api-types/v10";
import { BasedCategoryChannel, BasedDmChannel, BasedForumChannel, BasedTextChannel, BasedThreadChannel, BasedVoiceChannel, Channel, Guild, Message, Ready } from "../types";

export class WebSession extends WebSocketManager {

    private client: Client;

    constructor(client: Client, rest: REST) {

        super({
            token: client.token,
            intents: client.intents.bitfield,
            rest,
        });
        Object.defineProperty(this, "client", {
            value: client,
        });
    };


    async Handler(data: GatewayDispatchPayload) {
        console.log(data.t)
        if(data.t == GatewayDispatchEvents.GuildCreate){
            //Cargando todo.
            const guild = new Guild(data.d, this.client);
            guild.memberCount = data.d.member_count;
            guild.roles.setall(data.d.roles);
            const channels: any = [...data.d.channels, ...data.d.threads].map((channel)=>{ let ch: Channel | undefined = undefined; if (channel.type == ChannelType.GuildText || channel.type == ChannelType.GuildAnnouncement) ch = new BasedTextChannel(channel, this.client); else if (channel.type == ChannelType.DM || channel.type == ChannelType.GroupDM) ch = new BasedDmChannel(channel, this.client); else if (channel.type == ChannelType.GuildVoice || channel.type == ChannelType.GuildStageVoice) ch = new BasedVoiceChannel(channel, this.client); else if (channel.type == ChannelType.GuildCategory) ch = new BasedCategoryChannel(channel, this.client); else if (channel.type == ChannelType.GuildForum) ch = new BasedForumChannel(channel, this.client); else if (channel.type == ChannelType.PublicThread || channel.type == ChannelType.PrivateThread || channel.type == ChannelType.AnnouncementThread) ch = new BasedThreadChannel(channel, this.client); return ch; } ).filter((x) => x !== undefined);
            this.client.channels.setall(channels);
            console.log(data.d.members.length)
            guild.members.setall(data.d.members, guild);

            const cache = this.client.guilds.cache.get(guild.id);
            if (!cache) this.client.guilds.cache.set(guild.id, guild);
            
            this.client.emit("GuildCreate", guild);
        } else if (data.t == GatewayDispatchEvents.GuildUpdate) {
            const cache = this.client.guilds.cache.get(data.d.id);
                if (cache) {
                    this.client.guilds.cache.delete(cache.id);
                    //@ts-ignore
                    cache.data = data.d;
                    if(data.d.approximate_member_count && cache.memberCount != data.d.approximate_member_count) cache.memberCount = data.d.approximate_member_count;
                    if(data.d.description !== cache.description) cache.description = data.d.description;
                    if(data.d.name != cache.name) cache.name = data.d.name;
                    this.client.emit("GuildUpdate", cache);
                    this.client.guilds.cache.set(data.d.id, cache);
                };
        } else if (data.t == GatewayDispatchEvents.GuildDelete) {
            const cache = this.client.guilds.cache.get(data.d.id);
            if (cache) {
                this.client.emit("GuildDelete", cache);
                this.client.guilds.cache.delete(cache.id);
            };
        } else if (data.t == GatewayDispatchEvents.ChannelCreate || data.t == GatewayDispatchEvents.ChannelUpdate || data.t == GatewayDispatchEvents.ChannelDelete) {
            let channel: Channel | undefined = undefined;

            if (data.d.type == ChannelType.GuildText || data.d.type == ChannelType.GuildAnnouncement) channel = new BasedTextChannel(data.d, this.client);
            else if (data.d.type == ChannelType.DM || data.d.type == ChannelType.GroupDM) channel = new BasedDmChannel(data.d, this.client);
            else if (data.d.type == ChannelType.GuildVoice || data.d.type == ChannelType.GuildStageVoice) channel = new BasedVoiceChannel(data.d, this.client);
            else if (data.d.type == ChannelType.GuildCategory) channel = new BasedCategoryChannel(data.d, this.client);
            else if (data.d.type == ChannelType.GuildForum) channel = new BasedForumChannel(data.d, this.client);
            else if (data.d.type == ChannelType.PublicThread || data.d.type == ChannelType.PrivateThread || data.d.type == ChannelType.AnnouncementThread) channel = new BasedThreadChannel(data.d, this.client);

            if (channel) {
                const cache = this.client.channels.cache.get(channel.id);
                if (data.t == GatewayDispatchEvents.ChannelCreate) {
                    this.client.channels.cache.set(channel.id, channel);
                    this.client.emit('ChannelCreate', channel);
                };
                if (data.t == GatewayDispatchEvents.ChannelDelete) {
                    this.client.emit('ChannelDelete', channel);
                    if (cache) this.client.channels.cache.delete(channel.id);
                };
                if (data.t == GatewayDispatchEvents.ChannelUpdate) {
                    
                    if (!cache) this.client.channels.cache.set(channel.id, channel);
                    else { 
                        //@ts-ignore
                        cache.data = channel.data;
                        //@ts-ignore
                        cache._data = channel._data;
                        cache.name = channel.name;
                        this.client.channels.update(cache);
                    };

                    this.client.emit('ChannelUpdate', channel);
                };
            };
        } else if (data.t == GatewayDispatchEvents.MessageCreate) {
            const message = new Message(data.d, this.client);
            this.client.emit("MessageCreate", message);

            const channel = message.channel;

            if (channel && !channel.isChannelCategory()){ 
                channel.lastMessage = message.id;

                channel.messages.cache.set(message.id, message);

                this.client.channels.update(channel);
            };
        } else if (data.t == GatewayDispatchEvents.MessageDelete) {
            const channel = this.client.channels.cache.get(data.d.channel_id);
            let msg: Message | undefined;
            if (channel && !channel.isChannelCategory()) msg = channel.messages.cache.get(data.d.id);
            if (msg) {
                this.client.emit("MessageDelete", msg);
                if (channel && !channel.isChannelCategory()) channel.messages.cache.delete(data.d.id);
            };
        } else if (data.t == GatewayDispatchEvents.MessageUpdate) {
            const New_msg = new Message(data.d, this.client);
            const channel = this.client.channels.cache.get(data.d.channel_id);
            let Old_msg: Message | undefined;
            if (channel && !channel.isChannelCategory()) Old_msg = channel.messages.cache.get(data.d.id);
            this.client.emit("MessageUpdate", New_msg, Old_msg);
            if (channel && !channel.isChannelCategory()) {
                channel.messages.update(New_msg);
            };
        } else if (data.t == GatewayDispatchEvents.GuildRoleUpdate) {
            data.d
        };
    };

    async ready(data: GatewayReadyDispatchData) {
        const ready = new Ready(data, this.client);

        this.client.emit("Ready", ready);

        if (!this.client.intents.has(GatewayIntentBits.Guilds)) {

            for (let index = 0; index < data.guilds.length; index++) {
                if (index > 20) continue;
                const element = data.guilds[index];
                const channels = await this.client.rest.get("guildChannels", element.id);
                let guild;

                if (element.unavailable) guild = await this.client.rest.get("guild", element.id);
                if (channels) {
                    this.client.channels.setall(channels);
                };
                if (guild){ 
                    guild.members.fetchall();
                    guild.roles.fetchall(guild.id);
                    this.client.guilds.cache.set(guild.id, guild)
                };

            };
        };

        if (!this.client.id) this.client.setUser(ready.user);
        if (!this.client.aplicationId) this.client.setAplication(data.application.id);
    };
};