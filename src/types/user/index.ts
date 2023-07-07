import { Snowflake } from "discord-api-types/globals";
import { APIUser, UserAvatarFormat } from "discord-api-types/v10";
import { Client } from "../../core";
import { ImageURLOptions } from "@discordjs/rest";

export class User {
    private data: APIUser;
    private client: Client;

    id: Snowflake;
    username: string;

    constructor( data: APIUser, client: Client ){
        Object.defineProperty(this, "data", {
            value: data,
            writable: false
        });
        Object.defineProperty(this, "client", {
            value: client,
            writable: false
            });


        this.id = data.id
        this.username = data.username;
        
        data.accent_color 
    };
    
    get avatar(){
        return this.data.avatar;
    };

    get banner(){
        return this.data.banner;
    };

    avatarUrl(options?: ImageURLOptions){
        if(!this.avatar) return undefined;
        return this.client.rest.cdn.avatar(this.id, this.avatar, options);
    };
    
    bannerURL(options?: ImageURLOptions){
        if(!this.banner) return undefined;
        return this.client.rest.cdn.banner(this.id, this.banner, options);
    };

};