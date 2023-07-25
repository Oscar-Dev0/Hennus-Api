import { APIGuildStageVoiceChannel, APIGuildVoiceChannel } from "discord-api-types/v10";
import { BaseChannel } from "../base/channel";
import { Client } from "../../core";
import { Guild } from "../guild";
import { MessagesManager } from "../../utils";
import {  OverwriteBitField } from "../bitfield";
import { UpdateVoiceStageChannel } from ".";
import { HennusError, errorCodes } from "../../core/Error";

export class BasedVoiceChannel extends BaseChannel {

    private _cache_messages: MessagesManager;
    public guildId: string = "";
    public guild: Guild;
    public lastMessage: string = "";
    public bitrate: number = 0;
    public nsfw: boolean = false;
    public permission: {
        id: string;
        type: number;
        deny: OverwriteBitField;
        allow: OverwriteBitField;
    }[] = [];
    public position: number | undefined = undefined;
    public parent: string | undefined = undefined;

    constructor(private data: APIGuildVoiceChannel | APIGuildStageVoiceChannel, client: Client) {

        super(data, client);

        Object.defineProperty(this, "data", { value: data });

        const guild = this.client.guilds.cache.get(this.guildId);
        if (guild) this.guild = guild;

        this._cache_messages = new MessagesManager(this.client);
    }

    get messages() {
        this._cache_messages.fetchall(this.id);
        return this._cache_messages;
    }


    toJson() {
        return this.data;
    };

    async edit(data: UpdateVoiceStageChannel){
        if (data.name && (data.name.length >= 1 && data.name.length <= 100)) throw new HennusError(errorCodes.ChannelNameLength);
        return await this.client.channels.edit(this.id, data) as BasedVoiceChannel;
    };
};
