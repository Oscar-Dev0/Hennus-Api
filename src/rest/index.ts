import { Client } from "../core";
import { Guild, Message } from "../types";
import { BaseRest } from "./base";
import { getNode, postNode } from "./types";

export class RestSession extends BaseRest {

    private client: Client;

    constructor(client: Client){
        super(client);
        this.client = client;
    };

    async post<a extends keyof postNode, ar extends postNode[a]['args'], d extends postNode[a]['data'], r extends postNode[a]['return']>(type: a, args: ar, ...data: d ):  Promise<r | undefined> {
        if(type == "channelMessages"){
            //@ts-ignore
            const msg = await super._post("channelMessages", { body: JSON.stringify(args) }, ...data);
            if(!msg) return undefined;
            return new Message(msg) as r;
        }

        return undefined;
    };

    async get<a extends keyof getNode, d extends getNode[a]['data'], r extends getNode[a]['return']>( type: a, ...data: d ): Promise<r | undefined> {
        if(type == "channelMessages"){
            //@ts-ignore
            const msgs = await super._get("channelMessages", { headers: { ["with_counts"]: "true" } }, ...data);
            if(!msgs || !Array.isArray(msgs)) return undefined;
            return msgs.map((msg)=>new Message(msg)) as r;
        } else if(type == "userGuilds"){
            // @ts-ignore
            const guilds = await super._get("userGuilds", { headers: { ["with_counts"]: "true" } }, ...data);
            if (!guilds || !Array.isArray(guilds)) return undefined;
            return guilds as r;
        } else if( type == "guild" ){
            const params = new URLSearchParams();
            params.append("with_counts", "true")
            //@ts-ignore
            const guild = await super._get("guild", { query: params }, ...data);
            if (typeof guild == 'object') return new Guild( guild, this.client ) as r ;
            return undefined;
        };
        return undefined;
    };
};


export * from "./base";
export * from "./types";
export * from "./types";