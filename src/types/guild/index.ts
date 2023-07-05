import { APIGuild, CDNRoutes, Snowflake, GuildIconFormat, GuildBannerFormat } from "discord-api-types/v10";
import { BaseData } from "../base/data";
import { Client } from "../../core";


export class Guild extends BaseData {

    private data : APIGuild;
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
    };

    iconURL(format: GuildIconFormat){
        if(!this.icon) return undefined;
        return CDNRoutes.guildIcon(this.id, this.icon, format);
    };

    bannerURL(format: GuildBannerFormat){
        if (!this.banner) return undefined;
        return CDNRoutes.guildBanner(this.id, this.banner, format);
    };

    toJson(){
        return this.data;
    };
    

};

export * from "./Member";