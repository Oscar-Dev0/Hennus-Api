import { APIChannel, ChannelType } from "discord-api-types/v10";
import { DiscordSnowflake } from "@sapphire/snowflake"
import { BasedCategoryChannel, BasedDmChannel, BasedForumChannel, BasedTextChannel, BasedThreadChannel, BasedVoiceChannel } from "../channel";
import { Client } from "../../core";
import { MessageCreateData, MessageCreateOptions } from "../message";

export class BaseChannel {

    private data: APIChannel;
    public client: Client;

    constructor(data: APIChannel, client: Client) {
        this.data = data;
        this.client = client;
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

    async delete(){
        return await this.client.rest;
    }

    isChannelText(): this is BasedTextChannel{
        if(this.data.type == ChannelType.GuildAnnouncement || this.data.type == ChannelType.GuildText)return true;
        return false;
    };

    isChannelDm(): this is BasedDmChannel{
        if(this.data.type == ChannelType.DM || this.data.type == ChannelType.GroupDM) return true;
        return false;
    };

    isChannelVoice(): this is BasedVoiceChannel {
        if(this.data.type == ChannelType.GuildVoice || this.data.type == ChannelType.GuildStageVoice) return true;
        return false;
    };

    isChannelCategory(): this is BasedCategoryChannel {
        if(this.data.type == ChannelType.GuildCategory) return true;
        return false;
    };

    isChannelForum(): this is BasedForumChannel {
        if(this.data.type == ChannelType.GuildForum) return true;
        return false;
    };

    isChannelthread(): this is BasedThreadChannel {
        if(this.data.type == ChannelType.PublicThread || this.data.type == ChannelType.PrivateThread || this.data.type == ChannelType.AnnouncementThread) return true;
        return false;
    };
    
};