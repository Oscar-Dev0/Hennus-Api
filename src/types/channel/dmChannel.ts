import { APIDMChannel, APIGroupDMChannel, ChannelType } from "discord-api-types/v10";
import { BaseChannel } from "../base/channel";
import { User } from "../user";
import { CDN, BaseImageURLOptions } from "@discordjs/rest";
import { Client } from "../../core";
import { MessagesManager } from "../../utils";
import { channelFlags } from "../bitfield";

export class BasedDmChannel extends BaseChannel {
    private _cache_messages = new MessagesManager(this.client);
    private dm?: APIDMChannel;
    private dmGroup?: APIGroupDMChannel;



    constructor(private data: APIDMChannel | APIGroupDMChannel, client: Client) {
        super(data, client)
        Object.defineProperty(this, "data", { value: data })
        if(this.data.type == ChannelType.DM) this.dm = this.data;
        else if (this.data.type === ChannelType.GroupDM ) this.dmGroup = this.data ;
    };

    public lastMessage = this.data.last_message_id ?? undefined;
    public lastPin = this.data.last_pin_timestamp ?? undefined;
    public users = this.data.recipients ? this.data.recipients.map((x)=> new User(x, this.client)) : undefined;

    get messages(){
        this._cache_messages.fetchall(this.id);
        return this._cache_messages;
    };

    iconURL(options?: BaseImageURLOptions){
        if(!this.dmGroup || !this.dmGroup?.icon) return undefined;
        else return this.cdn.channelIcon(this.id, this.dmGroup.icon, options);
    };

    toJson(){
        return {...this.data};
    };

    private _patch(data: APIDMChannel | APIGroupDMChannel){
        if(data.type == ChannelType.DM) this.dm = data;
        else if (data.type === ChannelType.GroupDM ) this.dmGroup = data;
        if(data.name !== this.data.name) this.name = data.name ?? "";
        if(data.flags !== this.data.flags) this.flags = new channelFlags(data.flags).freeze();
        if(data.last_message_id !== this.data.last_message_id) this.lastMessage = data.last_message_id ?? undefined;
        if(data.last_pin_timestamp !== this.data.last_pin_timestamp) this.lastPin = data.last_pin_timestamp ?? undefined;
        if(Array.isArray(data.recipients)) this.users = data.recipients ? data.recipients.map((x)=> new User(x, this.client)) : undefined;
        this.data = data;
        return this;   
    };
};