import { APIGuild } from "discord-api-types/v10";
import { BaseData } from "../base/data";
import { Client } from "../../core";
import { ImageURLOptions } from "@discordjs/rest";
import { MembersManager, RolesManager } from "../../utils";
import { GuildChannelsManager } from "../../utils/manager/GuildChannels";


export class Guild extends BaseData {

    public id: string = "";
    public name: string;
    public description: string | undefined;
    public icon: string | undefined = undefined;
    public banner: string | undefined = undefined;
    public memberCount: number = 0;

    constructor(private data: APIGuild, client: Client) {

        super(client);

         Object.defineProperty(this, "data", { value: data });
        this.id = data.id;
        this.name = data.name;
        this.description = data.description ?? undefined;
        this.memberCount = data.approximate_member_count ?? 0;
        this.icon = data.icon ?? undefined;
        this.banner = data.banner ?? undefined;
    }


    public get channels() {
        const datas =  this.client.channels.search(this.id);
        const collect = new GuildChannelsManager(this.client, this);
        collect.cache.concat(datas);
        return collect;
    };

    public get emojis(){
        return this.client.emojis.search(this.id);
    };


    public members = new MembersManager(this.client, this.id);


    public roles = new RolesManager(this.client);


    iconURL(options?: ImageURLOptions) {
        if (!this.icon) return undefined;
        return this.cdn.icon(this.id, this.icon, options);
    }


    bannerURL(options?: ImageURLOptions) {
        if (!this.banner) return undefined;
        return this.cdn.banner(this.id, this.banner, options);
    }


    toJson() {
        return this.data;
    }


    private _patch(data: APIGuild) {
        if (data.name != this.data.name) this.name = data.name;
        if (data.description != this.data.description) this.description = data.description ?? undefined;
        if (data.icon != this.data.icon) this.icon = data.icon ?? undefined;
        if (data.banner != this.data.banner) this.banner = data.banner ?? undefined;
        if (data.approximate_member_count != this.data.approximate_member_count)
            this.memberCount = data.approximate_member_count ?? 0;


        if (this.data != data) Object.defineProperty(this, "data", { value: data });

        return this;
    };
    
    toString() {
        if (this.id) return `<@&${this.id}>`;
        else return "";
    };
}


export * from "./Member";
export * from "./roles";
export * from "./emojis";