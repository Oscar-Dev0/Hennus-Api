import { APIChannel, ChannelType } from "discord-api-types/v10";
import { DiscordSnowflake } from "@sapphire/snowflake"
import { BasedCategoryChannel, BasedDmChannel, BasedForumChannel, BasedTextChannel, BasedThreadChannel, BasedVoiceChannel } from "../channel";
import { Client } from "../../core";
import { MessageCreateData, MessageCreateOptions } from "../message";
import { BaseData } from "./data";
import { channelFlags } from "../bitfield";

export class BaseChannel extends BaseData {
    constructor(private _data: APIChannel, client: Client) {
        super(client);
        Object.defineProperty(this, "_data", { value: _data });
    };


    public id = this._data.id;
    public name = this._data.name ?? "";
    public flags = new channelFlags(this._data.flags).freeze();
    public type = this._data.type;

    get createdTimestamp() {
        return DiscordSnowflake.timestampFrom(this.id);
    };

    get createdAt() {
        return new Date(this.createdTimestamp);
    };

    async delete(){
        return await this.client.rest;
    }

    isChannelText(): this is BasedTextChannel{
        if(this.type == ChannelType.GuildAnnouncement || this.type == ChannelType.GuildText)return true;
        return false;
    };

    isChannelDm(): this is BasedDmChannel{
        if(this.type == ChannelType.DM || this.type == ChannelType.GroupDM) return true;
        return false;
    };

    isChannelVoice(): this is BasedVoiceChannel {
        if(this.type == ChannelType.GuildVoice || this.type == ChannelType.GuildStageVoice) return true;
        return false;
    };

    isChannelCategory(): this is BasedCategoryChannel {
        if(this.type == ChannelType.GuildCategory) return true;
        return false;
    };

    isChannelForum(): this is BasedForumChannel {
        if(this.type == ChannelType.GuildForum) return true;
        return false;
    };

    isChannelthread(): this is BasedThreadChannel {
        if(this.type == ChannelType.PublicThread || this.type == ChannelType.PrivateThread || this.type == ChannelType.AnnouncementThread) return true;
        return false;
    };

    async send(options: MessageCreateData){
        if(this.type == ChannelType.GuildCategory) return undefined;
        const mData: MessageCreateOptions = {
            content: undefined,
            embeds: undefined,
            components: undefined,
            attachments: undefined,
        };
        if (typeof options ==='string') {
            mData.content = options;
        } else if(typeof options == "object"){
            if(!options.attachments){
                if(options.components && Array.isArray(options.components)) mData.components = options.components;
                if(options.embeds && Array.isArray(options.embeds))mData.embeds = options.embeds;
                if(options.content) mData.content = options.content;
            } else{
                console.log("Attachments not supported yet"); //TODO implement attachment support for text channels
            };
        };
        return await this.client.rest.post("channelMessages", mData, this.id)
    };

};