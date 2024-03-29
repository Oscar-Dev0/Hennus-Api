import { CDN, REST, RequestData } from "@discordjs/rest";
import { Client } from "../../core";
import { GetRoutes, getOptions, getReturn, postOptions, postReturn, postRoutes } from "../types";


export class BaseRestFunction {

    public api: REST;
    public cdn = new CDN("https://cdn.discordapp.com/");

    constructor(client: Client) {
        this.api = new REST().setToken(client.token);
    };

    async _get<T extends keyof getOptions>(type: T, req: RequestData, ...args: getOptions[T]): Promise<getReturn[T]> {
        //@ts-ignore
        const l = GetRoutes(type, ...args) as `/${string}`;
        const data = await this.api.get(l, req);
        return data as getReturn[T];
    };

    async _post<T extends keyof postOptions>(type: T, req: RequestData, ...args: postOptions[T]): Promise<postReturn[T]> {
        //@ts-ignore
        const l = postRoutes(type, ...args) as `/${string}`;
        const data = await this.api.post(l, req);
        return data as postReturn[T];
    };


};

