import { GatewayIntentBits } from "discord-api-types/v10";
import { BaseClient } from "./base";
import { ClientOptions } from "./types";
import { RestSession } from "../rest";
import { WebSession } from "../wss";
export declare class Client extends BaseClient {
    token: string;
    intents: GatewayIntentBits;
    rest: RestSession;
    wss: WebSession;
    constructor(options: ClientOptions);
    login(): void;
}
