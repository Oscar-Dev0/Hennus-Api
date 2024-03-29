import { APIUser } from "discord-api-types/v10";
import { Client } from "../../core";
import { BaseUser } from "./base";

export class User extends BaseUser {
    constructor(data: APIUser, client: Client){
        super(data, client);
    };

};

export * from "./clientUser";