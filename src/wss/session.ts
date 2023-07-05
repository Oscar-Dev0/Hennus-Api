import { WebSocketManager, WebSocketShardEvents } from "@discordjs/ws";
import { Client, EventsString } from "../core";
import { REST } from "@discordjs/rest";
import { GatewayDispatchEvents } from "discord-api-types/v10";
import { Ready } from "../types";

export class WebSession extends WebSocketManager {

    private client: Client;

    constructor(client: Client, rest: REST){
        super({
            token: client.token,
            intents: client.intents,
            rest,
        });
        Object.defineProperty(this, "client", {
            value: client,
        });
    };

    handler(){
        this.on(WebSocketShardEvents.Dispatch, async ({ data, shardId })=>{
            if (data?.t === GatewayDispatchEvents.Ready){
                this.client.emit("Ready", new Ready(data.d, this.client))
            }
        })
    }
};