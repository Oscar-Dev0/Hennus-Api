import { GatewayIntentBits } from "discord-api-types/v10";
import { BaseClient } from "./base";
import { ClientOptions } from "./types";

import { RestSession } from "../rest";
import { WebSession } from "../wss";
import { HennusError, errorCodes } from "./Error";

export class Client extends BaseClient {

    token: string;
    intents: GatewayIntentBits;
    rest: RestSession;
    wss: WebSession;

    constructor(options: ClientOptions) {
        super();
        if (!options.token && options.token.length == 0) throw new HennusError(errorCodes.tokenNull);
        this.token = options.token;
        this.intents = options.intents.reduce((a, b) => a + b, GatewayIntentBits.MessageContent);
        try {
            this.rest = new RestSession(this);
            this.wss = new WebSession(this, this.rest.api);
        } catch {
            throw new HennusError(errorCodes.tokenInvalid)
        };
    };

    login() {
        try {
            this.wss.connect();
            this.wss.handler();
        }
        catch {
            throw new HennusError(errorCodes.connectError);
        };

    };
};