import { APIChannel, ChannelType, Routes } from "discord-api-types/v10";
import { DiscordSnowflake } from "@sapphire/snowflake"
import { BasedCategoryChannel, BasedDmChannel, BasedForumChannel, BasedTextChannel, BasedThreadChannel, BasedVoiceChannel } from "../channel";
import { Client } from "../../core";
import { MessageChannelOptions, MessageCreateData } from "../message";
import { BaseData } from "./data";
import { channelFlags } from "../bitfield";
import FormData from "form-data";
import { RawFile } from "@discordjs/rest";


export class BaseChannel extends BaseData {
    public id: string = "";
    public name: string = "";
    public flags: channelFlags["freeze"];
    public type: ChannelType;

    constructor(private _data: APIChannel, client: Client) {
        super(client);
        this._data = _data;
        Object.defineProperty(this, "_data", { value: _data });
        this.id = this._data.id;
        this.name = this._data.name ?? "";
        this.flags = new channelFlags(this._data.flags).freeze;
        this.type = this._data.type;
    };




    get createdTimestamp() {
        return DiscordSnowflake.timestampFrom(this.id);
    };

    get createdAt() {
        return new Date(this.createdTimestamp);
    };

    async delete() {
        await this.client.rest.api.delete(Routes.channel(this.id));
        return this;
    };

    isChannelText(): this is BasedTextChannel {
        if (this.type == ChannelType.GuildAnnouncement || this.type == ChannelType.GuildText) return true;
        return false;
    };

    isChannelDm(): this is BasedDmChannel {
        if (this.type == ChannelType.DM || this.type == ChannelType.GroupDM) return true;
        return false;
    };

    isChannelVoice(): this is BasedVoiceChannel {
        if (this.type == ChannelType.GuildVoice || this.type == ChannelType.GuildStageVoice) return true;
        return false;
    };

    isChannelCategory(): this is BasedCategoryChannel {
        if (this.type == ChannelType.GuildCategory) return true;
        return false;
    };

    isChannelForum(): this is BasedForumChannel {
        if (this.type == ChannelType.GuildForum) return true;
        return false;
    };

    isChannelthread(): this is BasedThreadChannel {
        if (this.type == ChannelType.PublicThread || this.type == ChannelType.PrivateThread || this.type == ChannelType.AnnouncementThread) return true;
        return false;
    };

    async send(options: MessageCreateData) {
        if (this.type == ChannelType.GuildCategory) return undefined;
        //@ts-ignore
        const id = (this._data ?? this.data).id;
        const mData: MessageChannelOptions = {
            content: undefined,
            embeds: undefined,
            components: undefined,
        };
        let data: MessageChannelOptions | { files: RawFile[], body?: MessageChannelOptions } | undefined = undefined;

        if (typeof options === 'string') {
            mData.content = options;
            data = mData;
        } else if (typeof options == "object") {

            if (options.components && Array.isArray(options.components)) mData.components = options.components;
            if (options.embeds && Array.isArray(options.embeds)) mData.embeds = options.embeds;
            if (options.content) mData.content = options.content;

            if (options.attachments) {
                data = { files: [], body: undefined };

                const from: RawFile[] = [];
                for (let i = 0; i < options.attachments.length; i++) {
                    const attach = options.attachments[i];
                    let contentType =  ""

                    let _buffer: Buffer | string | undefined = undefined;
                    let name: string = `default${i}.txt`;
                    if (typeof attach.attachment == "string") {
                        const imagen = await this.imagen(attach.attachment);
                        if (imagen) {
                            const buffer = Buffer.from(imagen.data, 'binary');
                            _buffer = buffer;
                            name = attach.name ?? `default.${imagen.type}`;
                            contentType = imagen.content_type;
                        };
                    } else { _buffer = attach.attachment as Buffer; name = attach.name ?? `default${i}.txt`; };

                    if (_buffer) from.push({
                        data: _buffer,
                        name,
                        contentType
                    });
                };

                data.body = mData;
                data.files = from;

            } else {
                data = mData;
            };
        };

        //@ts-ignore
        const msg = await this.client.rest.post("channelMessages", data, id);

        if(msg instanceof Error) throw msg;

        if(msg && typeof options == "object" && typeof options.timeout == "number") setTimeout(()=> msg.delete().catch(()=>undefined), options.timeout);
        
        return msg;
    };

    toString() {
        if (this.id) return `<#${this.id}>`;
        else return "";
    };


};