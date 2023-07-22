import { APIInteraction, ChannelType, InteractionResponseType, InteractionType, MessageFlags, Routes } from "discord-api-types/v10";
import { Client } from "../../core";
import { BaseData } from "./data";
import { Guild, GuildMember } from "../guild";
import { Channel } from "../channel";
import { Message } from "../events";
import { User } from "../user";
import { MessageInteractionOptions } from "../message";
import { RawFile } from "@discordjs/rest";
import { InteractionCommands } from "../interaction/commnads";
import { InteractionButton, InteractionSelectAny } from "../interaction/componets";
import { InteractionModal } from "../interaction/modal";

export class BasedInteraction extends BaseData {

    public id: string = "";
    public token: string = "";
    public aplicationId: string = "";
    public guildID: string;
    public guild: Guild;
    public channel: Channel;
    public message?: Message;
    public type: InteractionType;
    public member?: GuildMember;
    public user?: User;



    constructor(data: APIInteraction, client: Client) {
        super(client);

        /** Datos */
        this.id = data.id;
        this.token = data.token;
        this.guildID = data.guild_id ?? "";
        this.guild = this.client.guilds.resolve(this.guildID) ?? {} as Guild;
        this.channel = this.client.channels.resolve(data.channel?.id ?? "") ?? {} as Channel;
        if (data.message) this.message = new Message(data.message, client);
        this.type = data.type;
        if (data.member) this.member = new GuildMember(data.member, this.guild, client);
        if (data.user) this.user = new User(data.user, client);
        this.aplicationId = data.application_id;
    };

    isCommand(): this is InteractionCommands {
        return this.type == InteractionType.ApplicationCommand || this.type == InteractionType.ApplicationCommandAutocomplete;
    };

    isComponents(): this is (InteractionButton | InteractionSelectAny) {
        return this.type == InteractionType.MessageComponent;
    };

    isModal(): this is InteractionModal {
        return this.type == InteractionType.ModalSubmit;
    };

    async reply(options: MessageInteractionOptions) {
        //@ts-ignore
        const data: MessageInteractionOptions = {
            content: undefined,
            embeds: undefined,
            components: undefined,
            flags: undefined,
        };

        let files: RawFile[] | undefined = undefined;
        if(options.ephemeral) data.flags = MessageFlags.Ephemeral;

        if (typeof options === 'string') {
            data.content = options;
        } else if (typeof options == "object") {

            if (options.components && Array.isArray(options.components)) data.components = options.components;
            if (options.embeds && Array.isArray(options.embeds)) data.embeds = options.embeds;
            if (options.content) data.content = options.content;
            if ( options.flags ) data.flags = data.flags ?? 0 | options.flags

            if (options.attachments) {
                files = [];
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

                    if (_buffer) files.push({
                        data: _buffer,
                        name,
                        contentType
                    });
                };

            };
        };
        //@ts-ignore
        return await this.client.rest.post("interactionCallback", { body: { type: InteractionResponseType.ChannelMessageWithSource, data: data }, files }, this.id, this.token);
    };


};