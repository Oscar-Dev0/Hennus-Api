import { APIThreadChannel } from "discord-api-types/v10";
import { BaseChannel } from "../base/channel";
import { Client } from "../../core";
import { Guild } from "../guild";
import { MessagesManager } from "../../utils";
import { channelFlags, OverwriteBitField } from "../bitfield";

export class BasedThreadChannel extends BaseChannel {
    constructor(private data: APIThreadChannel, client: Client){
        super(data, client);
        Object.defineProperty(this, "data", { value: data });

        const guild = client.guilds.cache.get(this.guildId);
        if(guild) this.guild = guild;
    };

    public nsfw = this.data.nsfw ?? false;
    public permission = (this.data.permission_overwrites ?? []).map(({id, type, deny, allow})=> { return{ id, type, deny: new OverwriteBitField(Number(deny) ), allow:  new OverwriteBitField(Number(allow))} } );
    public position = this.data.position;
    public parent = this.data.parent_id ?? undefined;
    public lastPin: string = this.data.last_pin_timestamp ?? "";
    public lastMessage: string = this.data.last_message_id ?? "";
    public guildId: string = this.data.guild_id ?? "";
    private _cache_messages = new MessagesManager(this.client);
    public guild: Guild;

    get messages(){
        this._cache_messages.fetchall(this.id);
        return this._cache_messages;
    };

    toJson(){
        return this.data;
    };

    private _patch(data: APIThreadChannel){
        if (this.name != this.data.name) this.name = data.name;
        if (this.data.flags != data.flags ?? 0) this.flags = new channelFlags(data.flags).freeze();
        if (this.data.nsfw !== data.nsfw) this.nsfw = data.nsfw ?? false;
        if (this.data.permission_overwrites !== data.permission_overwrites) this.permission = (data.permission_overwrites ?? []).map(({ id, type, deny, allow }) => ({ id, type, deny: new OverwriteBitField(Number(deny)), allow: new OverwriteBitField(Number(allow)) }));
        if (this.data.position !== data.position) this.position = data.position;
        if (this.data?.parent_id !== data.parent_id) this.parent = data.parent_id ?? undefined;
        if (this.data?.guild_id !== data.guild_id) this.guildId = data.guild_id ?? "";
        
        this.data = data;
        return this;
    };

};