import { APIInteraction, ChannelType, InteractionResponseType, InteractionType } from "discord-api-types/v10";
import { Client } from "../../core";
import { BaseData } from "./data";
import { Guild, GuildMember } from "../guild";
import { Channel } from "../channel";
import { Message } from "../events";
import { User } from "../user";
import { MessageInteractionOptions } from "../message";
import { RawFile } from "@discordjs/rest";

export class BasedInteraction extends BaseData {

    public id: string = "";
    public token: string = "";
    public aplicationId: string = "";
    public guildID: string;
    public guild: Guild;
    public channel: Channel;
    public message: Message;
    public type: InteractionType;
    public member: GuildMember;
    public user: User;



    constructor(data: APIInteraction, client: Client) {
        super(client);

        /** Datos */
        this.id = data.id;
        this.token = data.token;
        this.guildID = data.guild_id ?? "";
        this.guild = this.client.guilds.resolve(this.guildID) ?? {} as Guild;
        this.channel = this.client.channels.resolve(data.channel?.id ?? "") ?? {} as Channel;
        this.message = new Message(data.message ?? {} as any, client);
        this.type = data.type;
        this.member = new GuildMember(data.member ?? {} as any, this.guild, client);
        this.user = new User(data.user ?? {} as any, client);
        this.aplicationId = data.application_id;
    };


    async reply(options: MessageInteractionOptions) {
        //@ts-ignore
        const mData: MessageInteractionOptions = {
            content: undefined,
            embeds: undefined,
            components: undefined,
            flags: undefined,
        };
        let data: { type: InteractionResponseType.ChannelMessageWithSource; data: MessageInteractionOptions; } | { files: RawFile[], body?: { type: InteractionResponseType.ChannelMessageWithSource; data: MessageInteractionOptions; } } | undefined = undefined;

        if (typeof options === 'string') {
            mData.content = options;
            data = { type: InteractionResponseType.ChannelMessageWithSource, data: mData };
        } else if (typeof options == "object") {

            if (options.components && Array.isArray(options.components)) mData.components = options.components;
            if (options.embeds && Array.isArray(options.embeds)) mData.embeds = options.embeds;
            if (options.content) mData.content = options.content;

            if (options.attachments) {
                data = { files: [], body: undefined };

                const from: RawFile[] = [];
                for (let i = 0; i < options.attachments.length; i++) {
                    const attach = options.attachments[i];
                    let contentType = ""

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

                data.body = { type: InteractionResponseType.ChannelMessageWithSource, data: mData };
                data.files = from;

            } else {
                data = { type: InteractionResponseType.ChannelMessageWithSource, data: mData };
            };
        };

        //@ts-ignore
        return await this.client.rest.post("interactionCallback", data, this.id, this.token);
    };


};