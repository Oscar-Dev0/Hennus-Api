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
        this.intents.add((options.intents as GatewayIntentBits) ?? 0);
        this.channels = new ChannelsManager(this);
        this.users = new UsersManager(this);
        this.guilds = new GuildsManager(this);
        this.aplication.commands = new commandsManger(this);
        this.emojis = new EmojisManager(this);
    }

    async login(token: string) {
        if (!token || token.length === 0) {
            throw new HennusError(errorCodes.TokenNull);
        }

        this.token = token;

        try {
            this.rest = new HennusRest(this);
            const ws = new HennusWS(this, this.rest.api);
            await ws.connect();

            ws.on(WebSocketShardEvents.Dispatch, ({ data }) => {
                const { t } = data;

                if (t === GatewayDispatchEvents.Ready) {
                    if (!this.status) {
                        this.status = true;
                        this.user = new ClientUser(data.d.user, this);
                        this.id = data.d.user.id;
                        this.aplicationId = data.d.application.id;
                        ws.ready(data.d);
                    }
                } else {
                    ws.Handler(data);
                }
            });

            this.ws = ws;
        } catch {
            throw new HennusError(errorCodes.TokenInvalid);
        }

        return token;
    }
}
