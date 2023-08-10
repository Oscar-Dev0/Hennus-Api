import { Client } from "../../../core";
import { channelConvertidor, resolvePartialEmoji } from "../../../utils";

export class Handler {
    

    constructor(client: Client) {
        Object.defineProperty(this, "client", { value: client });
    };

    public client: Client;

    channelConvertidor = channelConvertidor;

    emojiConvertidor = resolvePartialEmoji;


};