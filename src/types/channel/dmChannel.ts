// Import required types and classes
import { APIDMChannel, APIGroupDMChannel, ChannelType } from "discord-api-types/v10";
import { BaseChannel } from "../base/channel";
import { User } from "../user";
import { CDN, BaseImageURLOptions } from "@discordjs/rest";
import { Client } from "../../core";
import { MessagesManager } from "../../utils";
import { channelFlags } from "../bitfield";

// Declare the class
export class BasedDmChannel extends BaseChannel {
    private _cache_messages = new MessagesManager(this.client);
    private dm?: APIDMChannel;
    private dmGroup?: APIGroupDMChannel;
    public lastMessage: string | undefined;
    public lastPin: string | undefined;
    public users: User[] | undefined;

    constructor(private data: APIDMChannel | APIGroupDMChannel, client: Client) {
        // Call the constructor of the parent class (BaseChannel)
        super(data, client);

        // Set the values of the properties using the "data" parameter passed to the constructor
        Object.defineProperty(this, "data", { value: data });

        // Determine if the channel is DM or Group DM and set the corresponding property
        if (this.data.type == ChannelType.DM) this.dm = this.data;
        else if (this.data.type === ChannelType.GroupDM) this.dmGroup = this.data;
        // Properties of the class based on the DM or Group DM data
        this.lastMessage = this.data.last_message_id ?? undefined;
        this.lastPin = this.data.last_pin_timestamp ?? undefined;
        this.users = this.data.recipients ? this.data.recipients.map((x) => new User(x, this.client)) : undefined;

    }


    // Get the MessagesManager instance for this channel to fetch all messages
    get messages() {
        this._cache_messages.fetchall(this.id);
        return this._cache_messages;
    }

    // Method to get the URL for the channel's icon in a Group DM
    iconURL(options?: BaseImageURLOptions) {
        if (!this.dmGroup || !this.dmGroup?.icon) return undefined;
        else return this.cdn.channelIcon(this.id, this.dmGroup.icon, options);
    }

    // Method to convert the channel data to JSON
    toJson() {
        return { ...this.data };
    }

    // Private method to patch (update) the channel data

}
