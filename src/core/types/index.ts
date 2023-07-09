
import { GatewayIntentBits } from "discord-api-types/v10";

export interface ClientOptions {
    token: string;
    intents: GatewayIntentBits | GatewayIntentBits[];
};




/**
 * Data structure that makes it easy to interact with a bitfield.
 */
