import { CDN, REST } from "@discordjs/rest";
import { Client } from "../core";
import { baseRest } from "./base/base";
import { getNode, postNode } from "./types";

export * from "./base";
export * from "./types";
export * from "./types";

export class HennusRest{

    public api: REST;
    public cdn: CDN;

    constructor(client: Client){
        const rest = new baseRest(client);
        Object.defineProperty(this, "_rest", { value: rest });
        Object.defineProperty(this, "api", { value: rest.api });
        Object.defineProperty(this, "cdn", { value: rest.cdn });
    };

    async post<a extends keyof postNode, ar extends postNode[a]["args"], d extends postNode[a]["data"], r extends postNode[a]["return"]>(type: a, args: ar, ...data: d): Promise<r | undefined> {
        //@ts-ignore
       return await this._rest.post(type, args, ...data);
    };

    async get<a extends keyof getNode, d extends getNode[a]["data"], r extends getNode[a]["return"]>(type: a, ...data: d): Promise<r | undefined> {
        //@ts-ignore
        return await this._rest.get(type, ...data)
    };
};