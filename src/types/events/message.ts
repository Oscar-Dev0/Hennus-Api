import { APIMessage, GatewayMessageCreateDispatchData } from "discord-api-types/v10";
import { Client } from "../../core";
import { Guild } from "../guild";
import { Channel } from "../channel";
import { User } from "../user";

export class Message {

    public guild: Guild;
    public guildId: string; 

    public channel: Channel;
    public channelId: string;

    constructor(private message: GatewayMessageCreateDispatchData, private client: Client) {

        if(message.guild_id) this.guildId = message.guild_id;
        if(message.channel_id) this.channelId = message.channel_id;
        

        const channel = client.channels.get(this.channelId);
        if(channel) this.channel = channel;

        const guild = client.guilds.get(this.guildId);
        if(guild) this.guild = guild;
        

    };

    get content(){
        return this.message.content;
    };

    get mention(){
        return {
            users: this.message.mentions.map((x)=>new User(x, this.client)),
            channels: this.message.mention_channels ?? [],
            roles: this.message.mention_roles,
            everyone: this.message.mention_everyone
        };
    };

    
}