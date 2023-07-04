import { REST, RequestData } from "@discordjs/rest";
import { Client, Routes } from "../../core";


export class BaseRest extends REST {

    constructor(client: Client) {
      super();
      super.setToken(client.token);
    };

    async get(link : string, req: RequestData){
        const l = link as `/${string}`;
        const data = await super.get(l, req);
        console.log(data)
    };
};

export * from "./data";