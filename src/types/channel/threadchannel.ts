import { APIThreadChannel } from "discord-api-types/v10";
import { BaseChannel } from "../base/channel";
import { Client } from "../../core";
import { Guild } from "../guild";

export class BasedThreadChannel extends BaseChannel {
    
    private thread: APIThreadChannel;
    public lastPin: string;
    public lastMessage: string;
    public guildId: string;
    public guild: Guild;

    constructor(data: APIThreadChannel, client: Client){
        super(data, client);
        this.thread = data;

        if(data.last_pin_timestamp) this.lastPin = data.last_pin_timestamp;
        if(data.last_message_id)this.lastMessage = data.last_message_id; 

        if(data.guild_id) this.guildId = data.guild_id;

        const guild = client.guilds.get(this.guildId);
        if(guild) this.guild = guild;
    };

    get nsfw(){
        return this.thread.nsfw ?? false;
    };

    get permission(){
        return this.thread.permission_overwrites ?? [];
    };

    get position(){
        return this.thread.position;
    };

    get parent(){
        return this.thread.parent_id;
    };

    get toJson(){
        return this.thread;
    };

    setLast(data: { pin?: string, msg?: string }){
        if( data.msg ) this.lastMessage = data.msg;
        if( data.pin  && !isNaN(+new Date(data.pin)) ) this.lastPin = data.pin;
        return this;
    };

};