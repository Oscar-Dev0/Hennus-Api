import { APIAttachment, APIMessage } from "discord-api-types/v10";
import { ActionRowBuilder, AttachmentBuilder, EmbedBuilder } from "../../build"



export interface MessageCreateOptions {
    content?: string;
    embeds?: Array<EmbedBuilder>;
    components?: Array<ActionRowBuilder>;
    attachments?: Array<AttachmentBuilder>;
};

export type MessageCreateData = MessageCreateOptions | string;
