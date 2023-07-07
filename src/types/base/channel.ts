import { APIChannel, ChannelType } from "discord-api-types/v10";
import { DiscordSnowflake } from "@sapphire/snowflake"
import { BasedTextChannel } from "../channel";

export class BaseChannel {

    private data: APIChannel;

    constructor(data: APIChannel) {
        this.data = data;
    };

    get id() {
        return this.data.id;
    };

    get name() {
        const name = this.data.name;
        if (!name) return undefined;
        return name;
    };

    get flags() {
        return this.data.flags;
    };

    get type() {
        return this.data.type;
    };

    get createdTimestamp() {
        return DiscordSnowflake.timestampFrom(this.id);
    };

    get createdAt() {
        return new Date(this.createdTimestamp);
    };

    isChannelText(): this is BasedTextChannel{
        if(this.data.type == ChannelType.GuildAnnouncement || this.data.type == ChannelType.GuildText)return true;
        return false;
    };

    isChannelMd(){
        if(this.data.type == ChannelType.DM || this.data.type == ChannelType.GroupDM) return true;
        return false;
    };
    
};