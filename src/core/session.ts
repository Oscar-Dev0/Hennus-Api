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
import { EmojisManager } from "../utils/manager/emojis";

export class Client extends BaseClient {

    private status = false;

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
        this.aplication.commands = new commandsManger(this);
        this.emojis = new EmojisManager(this);
    }

    async login() {
        try {
            await this.wss.connect();
            this.wss.on(WebSocketShardEvents.Dispatch, ({ data }) => {
                if (data.t === GatewayDispatchEvents.Ready) {
                    if (!this.status) {
                        this.status = true;
                        Object.defineProperty(this, "user", { value: new ClientUser(data.d.user, this), configurable: true });
                        Object.defineProperty(this, "id", { value: data.d.user.id, configurable: true });
                        Object.defineProperty(this, "aplicationId", { value: data.d.application.id, configurable: true });

                        this.wss.ready(data.d);
                    };
                } else {
                    this.wss.Handler(data);
                }
            });
        } catch {
            throw new HennusError(errorCodes.ConnectionError);
        }
    }
}
