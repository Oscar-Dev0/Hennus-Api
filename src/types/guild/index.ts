import { APIGuild, CDNRoutes, Snowflake, GuildIconFormat, GuildBannerFormat } from "discord-api-types/v10";
import { BaseData } from "../base/data";
import { Client } from "../../core";


export class Guild extends BaseData {

    private data : APIGuild;
    private countMember: number = 0;
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

    iconURL(format: GuildIconFormat){
        if(!this.icon) return undefined;
        return CDNRoutes.guildIcon(this.id, this.icon, format);
    };

    bannerURL(format: GuildBannerFormat){
        if (!this.banner) return undefined;
        return CDNRoutes.guildBanner(this.id, this.banner, format);
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