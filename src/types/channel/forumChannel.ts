import { APIGuildForumChannel } from "discord-api-types/v10";
import { BaseChannel } from "../base/channel";
import { Client } from "../../core";
import { Guild } from "../guild";

export class BasedForumChannel extends BaseChannel {

    private forum: APIGuildForumChannel;
    public lastPin: string;
    public lastMessage: string;
    public guildId: string;
    public guild: Guild;


    constructor(data: APIGuildForumChannel, client: Client){
        super(data, client);
        this.forum = data;

        if(data.last_pin_timestamp) this.lastPin = data.last_pin_timestamp;
        if(data.last_message_id)this.lastMessage = data.last_message_id; 

        if(data.guild_id) this.guildId = data.guild_id;

        const guild = client.guilds.get(this.guildId);
        if(guild) this.guild = guild;

        

    };

   get topic(){
        return this.forum?.topic;
    }
    get nsfw(){
        return this.forum.nsfw ?? false;
    };

    get permission(){
        return this.forum.permission_overwrites ?? [];
    };

    get position(){
        return this.forum.position;
    };

    get parent(){
        return this.forum.parent_id;
    };

    get toJson(){
        return this.forum;
    };

    setLast(data: { pin?: string, msg?: string }){
        if( data.msg ) this.lastMessage = data.msg;
        if( data.pin  && !isNaN(+new Date(data.pin)) ) this.lastPin = data.pin;
        return this;
    };
};