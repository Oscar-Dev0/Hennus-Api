import { WebSocketManager } from "@discordjs/ws";
import { OptionalWebSocketManagerOptions, RequiredWebSocketManagerOptions } from "@discordjs/ws";
import { Client } from "../core";

export class WebSession extends WebSocketManager {
    constructor(client: Client){
        super({
            token: client.token,
            intents: client.intents,
            rest: client.rest
        });
    };
};