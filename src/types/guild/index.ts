import { APIGuild, Snowflake, GuildIconFormat, GuildBannerFormat } from "discord-api-types/v10";
import { BaseData } from "../base/data";
import { Client } from "../../core";
import { ImageURLOptions } from "@discordjs/rest";
import { Channels } from "../../utils";


export class Guild extends BaseData {

    private data : APIGuild;
    private countMember: number = 0;
    public channels = new Channels();
    id: Snowflake;
    name: string;
    description: string | null;
    icon: string | null;
    banner: string | null;

    constructor(data: APIGuild, client: Client) {
        super(client);
        this.data = data;
        this.id = data.id;
        this.name = data.name;
        this.description = data.description;
        this.icon = data.icon;
        this.banner = data.banner;
        this.countMember = data.approximate_member_count ?? 0;
    };

    iconURL(options?: ImageURLOptions){
        if(!this.icon) return undefined;
        return this.client.rest.cdn.icon(this.id, this.icon, options);
    };

    bannerURL(options?: ImageURLOptions){
        if (!this.banner) return undefined;
        return this.client.rest.cdn.banner(this.id, this.banner, options);
    };

    get memberCount(){
        const count = this.countMember;
        return count;
    };

    toJson(){
        return this.data;
    };

    setMemberCount(num: number){
        this.countMember = num;
    };
    

};

export * from "./Member";