import { APIDMChannel, APIGroupDMChannel, ChannelType } from "discord-api-types/v10";
import { BaseChannel } from "../base/channel";
import { User } from "../user";

export class dmChannel extends BaseChannel {
    private dm?: APIDMChannel;
    private dmGroup?: APIGroupDMChannel

    constructor(data: APIDMChannel | APIGroupDMChannel) {
        super(data)
        data.recipients
        if(data.type == ChannelType.DM) this.dm = data;
        else if (data.type === ChannelType.GroupDM ) this.dmGroup = data ;
    };

    get users(){
        if(this.dm) return this.dm.recipients?.map((x)=> new User(x));
        if(this.dmGroup) return this.dmGroup.recipients?.map((x)=> new User(x));
        return undefined;
    };



};