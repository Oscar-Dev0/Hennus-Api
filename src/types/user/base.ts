import { APIUser, UserPremiumType } from "discord-api-types/v10";
import { Client } from "../../core";
import { ImageURLOptions } from "@discordjs/rest";
import { BaseData } from "../base/data";

export class BaseUser extends BaseData {
    constructor( private data: APIUser, client: Client ){
        super(client);
        Object.defineProperty(this, "data", { value: data});
    };

    public id = this.data.id;
    public username = this.data.username;
    public discriminator = this.data.discriminator;
    public premium = this.data.premium_type ?? UserPremiumType.None;
    public bot = this.data.bot ?? false;
    public globalName = this.data.global_name ?? "";
    public color = this.data.accent_color ?? 0;
    public avatar = this.data.avatar ?? undefined;
    public banner = this.data.banner ?? undefined;

    avatarUrl(options?: ImageURLOptions){
        if(!this.avatar) return undefined;
        return this.cdn.avatar(this.id, this.avatar, options);
    };
    
    bannerURL(options?: ImageURLOptions){
        if(!this.banner) return undefined;
        return this.cdn.banner(this.id, this.banner, options);
    };

    toJson(){
        return this.data;
    };
};