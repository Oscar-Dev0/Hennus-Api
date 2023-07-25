import { APINewsChannel, APITextChannel } from "discord-api-types/v10";
import { BaseChannel } from "../base/channel";
import { Client } from "../../core";
import { Guild } from "../guild";
import { MessagesManager } from "../../utils";
import { channelFlags, OverwriteBitField } from "../bitfield";
import { UpdateTextAnnouncementChannel } from ".";
import { HennusError, errorCodes } from "../../core/Error";

export class BasedTextChannel extends BaseChannel {
    public topic: string = "";
    public nsfw: boolean = false;
    public permission: { id: string; type: number; deny: OverwriteBitField; allow: OverwriteBitField }[] = [];
    public position: number | undefined = undefined;
    public parent: string | undefined = undefined;
    public guildId: string = "";
    public lastMessage: string | undefined = undefined;
    public guild: Guild;
    private _cache_messages: MessagesManager;

    constructor(private data: APITextChannel | APINewsChannel, client: Client) {

        super(data, client);

        Object.defineProperty(this, "data", { value: data });

        this.topic = this.data.topic ?? "";
        this.nsfw = this.data.nsfw ?? false;
        this.permission = (this.data.permission_overwrites ?? []).map(({ id, type, deny, allow }) => ({
            id,
            type,
            deny: new OverwriteBitField(Number(deny)),
            allow: new OverwriteBitField(Number(allow)),
        }));
        this.position = this.data.position;
        this.parent = this.data.parent_id ?? undefined;
        this.guildId = this.data.guild_id ?? "";

        const guild = client.guilds.cache.get(this.guildId);
        if (guild) this.guild = guild;

        this.lastMessage = this.data.last_message_id ?? undefined;


        this._cache_messages = new MessagesManager(this.client);
    }


    get messages() {
        this._cache_messages.fetchall(this.id);
        return this._cache_messages;
    };


    toJson() {
        return this.data;
    };

    async edit(data: UpdateTextAnnouncementChannel){
        if (data.name && (data.name.length >= 1 && data.name.length <= 100)) throw new HennusError(errorCodes.ChannelNameLength);
        if (data.topic && (data.topic.length < 0 || data.topic.length > 1024)) throw new HennusError(errorCodes.ChannelTopicLength);
        return await this.client.channels.edit(this.id, data) as BasedTextChannel;
    };
};
