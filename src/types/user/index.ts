import { Snowflake } from "discord-api-types/globals";
import { APIUser } from "discord-api-types/v10";

export class User {
    private data: APIUser;

    id: Snowflake;
    username: string;

    constructor( data: APIUser ){
        Object.defineProperty(this, "data", {
            value: data,
            writable: false
        });

        this.id = data.id
        this.username = data.username;
        data.accent_color 

    }
}