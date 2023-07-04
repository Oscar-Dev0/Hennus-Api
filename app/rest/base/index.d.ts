import { REST, RequestData } from "@discordjs/rest";
import { Client } from "../../core";
export declare class BaseRest {
    api: REST;
    constructor(client: Client);
    get(link: string, req: RequestData): Promise<void>;
}
