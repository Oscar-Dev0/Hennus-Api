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
import { ModalBuilder } from "../../build";

export class BasedInteraction extends BaseData {

    public id: string = "";
    public token: string = "";
    public aplicationId: string = "";
    public guildID: string;
    public guild: Guild;
    public channel: Channel;
    public message?: Message;
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
        if (data.message) this.message = new Message(data.message, client);
        this.type = data.type;
        if (data.member) { this.member = new GuildMember(data.member, this.guild, client); if (this.member.user) this.user = this.member.user };
        if (data.user) { this.user = new User(data.user, client); const member = this.guild.members.resolve(this.user.id); if (member) this.member = member };
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

    async reply(options: MessageInteractionOptions | string) {
        //@ts-ignore
        const data: MessageInteractionOptions = {
            content: undefined,
            embeds: undefined,
            components: undefined,
            flags: undefined,
        };

        let files: RawFile[] | undefined = undefined;


        if (typeof options === 'string') {
            data.content = options;
        } else if (typeof options == "object") {

            if (options.components && Array.isArray(options.components)) data.components = options.components;
            if (options.embeds && Array.isArray(options.embeds)) data.embeds = options.embeds;
            if (options.content) data.content = options.content;
            if (options.ephemeral) data.flags = MessageFlags.Ephemeral;
            if (options.flags) data.flags = data.flags ?? 0 | options.flags;


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
        const msg = await this.client.rest.post("interactionCallback", { body: { type: InteractionResponseType.ChannelMessageWithSource, data: data }, files }, this.id, this.token);

        if (msg instanceof Error) throw msg;

        if (typeof options == "object" && typeof options.timeout == "number") setTimeout(async () => { try { await this.client.rest.api.delete(Routes.webhookMessage(this.client.id, this.token, "@original")); } catch { undefined }; }, options.timeout);

        return msg;
    };

    async respond(modal: ModalBuilder) {
        return await this.client.rest.post("interactionCallback", { body: { type: InteractionResponseType.Modal, data: modal } }, this.id, this.token)
    };


};