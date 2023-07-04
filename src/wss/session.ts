import { WebSocketManager } from "@discordjs/ws";
import { Client } from "../core";
import { REST } from "@discordjs/rest";

export class WebSession extends WebSocketManager {
    constructor(client: Client, rest: REST){
        super({
            token: client.token,
            intents: client.intents,
            rest
        });
    };
};