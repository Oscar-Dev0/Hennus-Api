import { WebSocketManager } from "@discordjs/ws";
import { Client } from "../core";
import { REST } from "@discordjs/rest";
export declare class WebSession extends WebSocketManager {
    constructor(client: Client, rest: REST);
}
