
import { ShardRange } from "@discordjs/ws";
import { GatewayIntentBits } from "discord-api-types/v10";

export interface ClientOptions {
    token: string;
    intents: GatewayIntentBits | GatewayIntentBits[];
    sharCount?: number | null;
    shardIds?: number[] | ShardRange | null; 
    rest?: {
        logs_error?: boolean;
    };
};
