import { APIAttachment, APIMessage } from "discord-api-types/v10";
import { ActionRowBuilder, EmbedBuilder } from "../../build"



export interface MessageCreateOptions {
    content?: string;
    embeds?: Array<EmbedBuilder>;
    components?: Array<ActionRowBuilder>;
    attachments?: Array<APIAttachment>;
};

export type MessageCreateData = MessageCreateOptions | string;

export class Message {
    private data: APIMessage;

    constructor(data: APIMessage){
        this.data = data;
    };

    get id(){
        return this.data.id;
    };

    get toJson(){
        return this.data
    };
};