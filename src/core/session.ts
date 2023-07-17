import { GatewayIntentBits, GatewayOpcodes } from "discord-api-types/v10";
import { BaseClient } from "./base";
import { ClientOptions } from "./types";
import { RestSession } from "../rest";
import { WebSession } from "../wss";
import { HennusError, errorCodes } from "./Error";
import { WebSocketShardEvents } from "@discordjs/ws";
import { ChannelsManager, GuildsManager, UsersManager } from "../utils";
import { ClientUser } from "../types";

export class Client extends BaseClient {

    constructor(public options: ClientOptions) {
        super();
        if (!options.token && options.token.length == 0) throw new HennusError(errorCodes.tokenNull);
        this.token = options.token;
        if (options.intents === undefined) {
            this.intents.add(0 as GatewayIntentBits);
        } else {
            if (Array.isArray(options.intents)) this.intents.add(...options.intents);
            else this.intents.add(options.intents);
        };
        this.rest = new RestSession(this);
        this.wss = new WebSession(this, this.rest.api);
        this.channels = new ChannelsManager(this);
        this.users = new UsersManager(this);
        this.guilds = new GuildsManager(this);

    };

    async login() {

        try {
            await this.wss.connect();
            this.wss.on(WebSocketShardEvents.Dispatch, ({ data }) => this.wss.Handler(data));
            this.wss.on(WebSocketShardEvents.Ready, ({data})=> {
                this.user = new ClientUser(data.user, this);
                this.id = data.user.id;
                this.aplicationId = data.application.id;

                this.wss.ready(data);
            });
            //this.wss.send(0, { op: GatewayOpcodes.RequestGuildMembers, d: { guild_id: "", query: "", limit: 0 } })
        }
        catch {
            throw new HennusError(errorCodes.connectError);
        };

    };
};