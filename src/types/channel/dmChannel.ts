import { APIDMChannel, APIGroupDMChannel, ChannelType } from "discord-api-types/v10";
import { BaseChannel } from "../base/channel";
import { User } from "../user";
import { CDN, BaseImageURLOptions } from "@discordjs/rest";
import { Client } from "../../core";
import { MessagesCollection } from "../../utils";

export class BasedDmChannel extends BaseChannel {
    private _cache_messages = new MessagesCollection();
    private dm?: APIDMChannel;
    private dmGroup?: APIGroupDMChannel;
    public lastPin: string;
    public lastMessage: string;


    constructor(data: APIDMChannel | APIGroupDMChannel, client: Client) {
        super(data, client)
        if( data.last_pin_timestamp ) this.lastPin = data.last_pin_timestamp;
        if( data.last_message_id ) this.lastMessage = data.last_message_id;
        if(data.type == ChannelType.DM) this.dm = data;
        else if (data.type === ChannelType.GroupDM ) this.dmGroup = data ;
    };

    get users(){
        if(this.dm) return this.dm.recipients?.map((x)=> new User(x, this.client));
        if(this.dmGroup) return this.dmGroup.recipients?.map((x)=> new User(x, this.client));
        return undefined;
    };

    setLast(data: { pin?: string, msg?: string }){
        if( data.msg ) this.lastMessage = data.msg;
        if( data.pin  && !isNaN(+new Date(data.pin)) ) this.lastPin = data.pin;
        return this;
    };

    get messages(){
        return this._cache_messages.restSet(this.client.rest, this.id);
    };

    iconURL(options?: BaseImageURLOptions){
        if(!this.dmGroup || !this.dmGroup?.icon) return undefined;
        else return new CDN().channelIcon(this.id, this.dmGroup.icon, options);
    };

    toJson(){
        if(this.dm) return {...this.dm, type: "dm"};
        if(this.dmGroup) return { ...this.dmGroup, type: "dmgroup" };
        return undefined;
    };
};