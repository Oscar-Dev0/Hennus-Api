import { APIUser } from "discord-api-types/v10";
import { BaseUser } from "./base";
import { Client } from "../../core";

export class ClientUser extends BaseUser {
    constructor(data: APIUser, client: Client){
        super(data, client);
    };


};