import { APIAllowedMentions, APIApplicationCommandOptionChoice, APIMessageReference, MessageFlags } from "discord-api-types/v10";
import { ActionRowBuilder, AttachmentBuilder, EmbedBuilder } from "../../build"


interface MessageOptions {
    allowed_mentions?: APIAllowedMentions;
    components?: ActionRowBuilder[];
    content?: string;
    embeds?: EmbedBuilder[];
    attachments?: AttachmentBuilder[];
    message_reference?: APIMessageReference;
    tts?: boolean;
    timeout?: number;
    choice?: APIApplicationCommandOptionChoice[];
    customId?: string;
    title?: string;
    flags?: MessageFlags;
    ephemeral?: boolean;
};

export type MessageChannelOptions = Omit<MessageOptions, "ephemeral" | "flags" | "title" | "choice" | "customId">;
export type MessageInteractionOptions = Omit<MessageOptions, "tts" | "message_reference">;



export type MessageCreateData = MessageChannelOptions | string;
