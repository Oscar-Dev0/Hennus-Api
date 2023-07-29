import { APIMessage, GatewayMessageCreateDispatchData, GatewayMessageUpdateDispatchData, Routes, Snowflake } from "discord-api-types/v10";
import { Client } from "../../core";
import { Guild, GuildMember } from "../guild";
import { Channel } from "../channel";
import { User } from "../user";
import { EmbedBuilder } from "../../build";
import { MessageChannelOptions } from "../message";

export class Message {

    private message: GatewayMessageCreateDispatchData | GatewayMessageUpdateDispatchData;
    private client: Client;

    public guild: Guild;
    public guildId: string; 

    public channel: Channel;
    public channelId: string;

    constructor(message: GatewayMessageCreateDispatchData | GatewayMessageUpdateDispatchData, client: Client) {
        this.message = message; 
        this.client = client;
        
        if(message.guild_id) this.guildId = message.guild_id;
        if(message.channel_id) this.channelId = message.channel_id;
        

        const channel = client.channels.cache.get(this.channelId);
        if(channel) this.channel = channel;
        if( !message.guild_id && channel && ( channel.isChannelCategory() || channel.isChannelForum() || channel.isChannelText() || channel.isChannelVoice() || channel.isChannelthread())) this.guildId = channel.guildId;

        const guild = client.guilds.cache.get(this.guildId);
        if(guild) this.guild = guild;
        
    };

    get editedTimestamp(){
        return this.message.edited_timestamp ?? "";
    };

    get id(){
        return this.message.id;
    };

    get timestamp(){
        return this.message.timestamp ?? "";
    };

    get tts(){
        return this.message.tts ?? false;
    };

    get pinned(){
        return this.message.pinned ?? false;
    };

    get embeds(){
        return  ( this.message.embeds ?? []).map((x)=>new EmbedBuilder(x));
    };

    get type(){
        return this.message.type ?? 0;
    };

    get author(){
        if(this.message.author) return new User(this.message.author, this.client )
        else if(this.member?.user) return this.member.user;
        else return {} as User;
    };

    get member(): GuildMember {
        if(!this.message.member && this.author) return this.guild.members.resolve(this.author.id) as GuildMember;
        else if(!this.message.member?.user && this.author ) return this.guild.members.resolve(this.author.id) as GuildMember;
        else return new GuildMember(this.message.member ?? {} as any, this.guild, this.client) as GuildMember;
    };

    get content(){
        return this.message.content;
    };

    get mention(){
        return {
            users: this.message.mentions.map((x)=>new User(x, this.client)),
            channels: this.message.mention_channels ?? [],
            roles: this.message.mention_roles ?? [],
            everyone: this.message.mention_everyone ?? false,
        };
    };

    get components(){
        return this.message.components ?? [];
    };

    get toJson(){
        return this.message;
    };

    async delete(){
        const data = await this.client.rest.api.delete(Routes.channelMessage(this.channelId, this.id));
        if(data instanceof Error) throw data;
        return data;
    };

    async edit(data: MessageChannelOptions){
        const msg = await this.client.rest.api.patch(Routes.channelMessage(this.channelId, this.id), {body: data});
        if(msg instanceof Error) throw msg;
        return msg;
    };

    async ping(){
        const msg = await this.client.rest.api.put(Routes.channelPin(this.channelId, this.id));
        if(msg instanceof Error) throw msg;
        return msg;
    };
    
};