import { GatewayIntentBits } from "discord-api-types/v10";
import { BaseClient } from "./base";
import { ClientOptions } from "./types";

import { RestSession } from "../rest";
import { WebSession } from "../wss";
import { HennusError, errorCodes } from "./Error";
import { WebSocketShardEvents } from "@discordjs/ws";
import { IntentsBitField } from "../types/bitfield/intentsbitfield";

export class Client extends BaseClient {

    token: string;
    intents = new IntentsBitField();
    rest: RestSession;
    wss: WebSession;

    constructor(options: ClientOptions) {
        super();
        if (!options.token && options.token.length == 0) throw new HennusError(errorCodes.tokenNull);
        this.token = options.token;
        if (options.intents === undefined) {
            this.intents.add(0 as GatewayIntentBits);
        } else {
            if (Array.isArray(options.intents)) this.intents.add(...options.intents);
            else this.intents.add(options.intents);
        };
        
        this.wss = new WebSession(this, this.rest.api);
        this.rest = new RestSession(this);

    };

    async login() {

        try {
            await this.wss.connect();
            this.wss.on(WebSocketShardEvents.Dispatch, ({ data }) => this.wss.Handler(data));
        }
        catch {
            throw new HennusError(errorCodes.connectError);
        };

    };
};