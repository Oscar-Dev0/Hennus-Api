import { APIGuild, GatewayGuildCreateDispatchData } from "discord-api-types/v10";
import { BaseData } from "../base/data";
import { Client } from "../../core";
import { ImageURLOptions } from "@discordjs/rest";
import { MembersManager, RolesManager } from "../../utils";


export class Guild extends BaseData {

    constructor( private data: APIGuild, client: Client) {
        super(client);

        Object.defineProperty(this, "data", { value: data});

    };
      //@ts-ignore
    public memberCount = this.data.approximate_member_count ?? 0 ;
    public id = this.data.id;
    public name = this.data.name;
    public description = this.data.description;
    public icon = this.data.icon;
    public banner = this.data.banner;
  



    public get channels(){
        return this.client.channels.search(this.id);
    };
    public members = new MembersManager(this.client, this.id);
    public roles = new RolesManager(this.client);

    iconURL(options?: ImageURLOptions){
        if(!this.icon) return undefined;
        return this.cdn.icon(this.id, this.icon, options);
    };

    bannerURL(options?: ImageURLOptions){
        if (!this.banner) return undefined;
        return this.cdn.banner(this.id, this.banner, options);
    };

    toJson(){
        return this.data;
    };

    private _patch(data: APIGuild){
        if(data.name != this.data.name) name = data.name;
        if(data.description != this.data.description) this.description = data.description;
        if(data.icon != this.data.icon) this.icon = data.icon;
        if(data.banner != this.data.banner) this.banner = data.banner;
        if(data.approximate_member_count != this.data.approximate_member_count) this.memberCount = data.approximate_member_count ?? 0;

        if( this.data != data ) Object.defineProperty(this, "data", { value: data});

        return this;
    };

};

export * from "./Member";
export * from "./roles";