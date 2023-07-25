import { APIDMChannel, APIGroupDMChannel, ChannelType } from "discord-api-types/v10";
import { BaseChannel } from "../base/channel";
import { User } from "../user";
import { BaseImageURLOptions } from "@discordjs/rest";
import { Client } from "../../core";
import { MessagesManager } from "../../utils";
import { UpdateDMGrupChannel } from ".";
import { HennusError, errorCodes } from "../../core/Error";


export class BasedDmChannel extends BaseChannel {
    private _cache_messages = new MessagesManager(this.client);
    private dm?: APIDMChannel;
    private dmGroup?: APIGroupDMChannel;
    public lastMessage: string | undefined;
    public lastPin: string | undefined;
    public users: User[] | undefined;

    constructor(private data: APIDMChannel | APIGroupDMChannel, client: Client) {

        super(data, client);
        Object.defineProperty(this, "data", { value: data });

        if (this.data.type == ChannelType.DM) this.dm = this.data;
        else if (this.data.type === ChannelType.GroupDM) this.dmGroup = this.data;

        this.lastMessage = this.data.last_message_id ?? undefined;
        this.lastPin = this.data.last_pin_timestamp ?? undefined;
        this.users = this.data.recipients ? this.data.recipients.map((x) => new User(x, this.client)) : undefined;

    };



    get messages() {
        this._cache_messages.fetchall(this.id);
        return this._cache_messages;
    };


    iconURL(options?: BaseImageURLOptions) {
        if (!this.dmGroup || !this.dmGroup?.icon) return undefined;
        else return this.cdn.channelIcon(this.id, this.dmGroup.icon, options);
    };


    toJson() {
        return { ...this.data };
    };

    async edit(data: UpdateDMGrupChannel){
        if (data.name && (data.name.length >= 1 && data.name.length <= 100)) throw new HennusError(errorCodes.ChannelNameLength);
        return await this.client.channels.edit(this.id, data) as BasedDmChannel;
    }
};
