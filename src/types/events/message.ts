import { APIMessage, GatewayMessageCreateDispatchData, GatewayMessageUpdateDispatchData, Snowflake } from "discord-api-types/v10";
import { Client } from "../../core";
import { Guild, GuildMember } from "../guild";
import { Channel } from "../channel";
import { User } from "../user";
import { EmbedBuilder } from "../../build";

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
        

        const channel = client.channels.get(this.channelId);
        if(channel) this.channel = channel;
        if(channel && ( channel.isChannelCategory() || channel.isChannelForum() || channel.isChannelText() || channel.isChannelVoice() || channel.isChannelthread())) this.guildId = channel.guildId;

        const guild = client.guilds.get(this.guildId);
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
        if(this.message.author) return new User(this.message.author, this.client );
        return {} as User;
    };

    get member(){
        if(!this.message.member) return undefined;
        return new GuildMember(this.message.member, this.guild, this.client);
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

    get toJson(){
        return this.message;
    };
    
};