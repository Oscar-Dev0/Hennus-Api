import { APIGuildStageVoiceChannel, APIGuildVoiceChannel } from "discord-api-types/v10";
import { BaseChannel } from "../base/channel";
import { Client } from "../../core";
import { Guild } from "../guild";

export class BasedVoiceChannel extends BaseChannel {
    
    private voice: APIGuildVoiceChannel | APIGuildStageVoiceChannel;
    public guildId: string;
    public guild: Guild;
    public lastMessage: string;

    constructor(data: APIGuildVoiceChannel | APIGuildStageVoiceChannel, client: Client){
        super(data, client);
        this.voice = data;

        this.client = client;
        if(data.guild_id) this.guildId = data.guild_id;

        const guild = this.client.guilds.get(this.guildId);
        if(guild) this.guild = guild;

        if(data.last_message_id) this.lastMessage = data.last_message_id;

    };

    get bitrate(){
        return this.voice.bitrate || 0;
    };

    get nsfw(){
        return this.voice.nsfw ?? false;
    };

    get permission(){
        return this.voice.permission_overwrites ?? [];
    };

    get position(){
        return this.voice.position;
    };

    get parent(){
        return this.voice.parent_id;
    };

    setlast(id: string){
        this.lastMessage = id;
    };

    toJson(){
        return this.voice;
    };

};