import { Client } from "../core";
import { baseRest } from "./base/base";
import { getNode, postNode } from "./types";

export * from "./base";
export * from "./types";
export * from "./types";

export class HennusRest extends baseRest {
    constructor(client: Client){
        super(client);
    };

    override async post<a extends keyof postNode, ar extends postNode[a]["args"], d extends postNode[a]["data"], r extends postNode[a]["return"]>(type: a, args: ar, ...data: d): Promise<r | undefined> {
       return await super.post(type, args, ...data);
    };

    override async get<a extends keyof getNode, d extends getNode[a]["data"], r extends getNode[a]["return"]>(type: a, ...data: d): Promise<r | undefined> {
        return await super.get(type, ...data)
    };
};