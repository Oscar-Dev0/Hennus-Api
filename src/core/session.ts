import { GatewayDispatchEvents, GatewayIntentBits, GatewayOpcodes } from "discord-api-types/v10";
import { BaseClient } from "./base";
import { ClientOptions } from "./types";
import { HennusRest } from "../rest";
import { HennusWS } from "../ws";
import { HennusError, errorCodes } from "./Error";
import { WebSocketShardEvents } from "@discordjs/ws";
import { ChannelsManager, GuildsManager, UsersManager } from "../utils";
import { ClientUser } from "../types";
import { commandsManger } from "./base/aplication";

export class Client extends BaseClient {
    constructor(public options: Partial<ClientOptions>) {
        super();
        if (!options.token || options.token.length === 0) {
            throw new HennusError(errorCodes.TokenNull);
        }
        this.token = options.token;
        this.intents.add((options.intents as GatewayIntentBits) ?? 0);
        this.rest = new HennusRest(this);
        this.wss = new HennusWS(this, this.rest.api);
        this.channels = new ChannelsManager(this);
        this.users = new UsersManager(this);
        this.guilds = new GuildsManager(this);
        this.commands = new commandsManger(this);
    }

    async login() {
        try {
            await this.wss.connect();
            this.wss.on(WebSocketShardEvents.Dispatch, ({ data }) => {
                if (data.t === GatewayDispatchEvents.Ready) {
                    ///@ts-ignore
                    this.set(this, { user: data.d.user, aplicationid: data.d.application.id });
                    this.wss.ready(data.d);
                } else {
                    this.wss.Handler(data);
                }
            });
        } catch {
            throw new HennusError(errorCodes.ConnectionError);
        }
    }
}
