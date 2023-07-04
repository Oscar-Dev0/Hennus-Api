import { REST, RequestData } from "@discordjs/rest";
import { Client, Routes } from "../../core";


export class BaseRest {

    public api : REST;

    constructor(client: Client) {
        this.api = new REST().setToken(client.token);
    };

    async get(link : string, req: RequestData){
        const l = link as `/${string}`;
        const data = await this.api.get(l, req);
        console.log(data)
    };
};