import { APINewsChannel, APITextChannel,  } from "discord-api-types/v10";
import { BaseChannel } from "../base/channel";
import { Client } from "../../core";
import { Collection } from "@discordjs/collection";
import { Guild } from "../guild";
import { Message } from "../events";
import { MessagesCollection } from "../../utils";

export class BasedTextChannel extends BaseChannel {
    
    private _cache_messages = new MessagesCollection();
    private msg: APITextChannel | APINewsChannel;
    public guildId: string;
    public guild: Guild;
    public lastMessage: string;

    constructor( data: APITextChannel | APINewsChannel, client: Client) {
        super(data, client);
        if(data.guild_id) this.guildId = data.guild_id;

        const guild = client.guilds.get(this.guildId);
        if(guild) this.guild = guild;

        if(data.last_message_id) this.lastMessage = data.last_message_id;
    };

    get topic(){
        return this.msg.topic;
    };

    get messages(){
        return this._cache_messages.restSet(this.client.rest, this.id);
    };

    get nsfw(){
        return this.msg.nsfw ?? false;
    };

    get permission(){
        return this.msg.permission_overwrites ?? [];
    };

    get position(){
        return this.msg.position;
    };

    get parent(){
        return this.msg.parent_id;
    };

    setlast(id: string){
        this.lastMessage = id;
    };

    get toJson(){
        return this.msg;
    };
};