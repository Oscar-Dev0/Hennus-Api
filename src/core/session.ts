import { GatewayIntentBits } from "discord-api-types/v10";
import { BaseClient } from "./base";
import { ClientOptions } from "./types";

import { RestSession } from "../rest";
import { WebSession } from "../wss";

export class Client extends BaseClient {

    token: string;
    intents: GatewayIntentBits;
    rest: RestSession;
    wss: WebSession;

    constructor(options: ClientOptions) {
        super();
        this.token = options.token || "";
        this.intents = options.intents.reduce((a,b)=>a+b, GatewayIntentBits.MessageContent);
        this.rest = new RestSession(this);
        this.wss = new WebSession(this, this.rest.api);
    };

    login(){
        this.wss.connect();
    };
};