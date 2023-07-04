import { Client } from "../core";
import { BaseRest } from "./base";

export class RestSession extends BaseRest {
    constructor(client: Client){
        super(client);
    };
};


export * from "./base";
export * from "./data";
export * from "./types";