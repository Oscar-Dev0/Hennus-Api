import { APIGuild, Snowflake } from "discord-api-types/v10";
import { GuildBannerFormat, GuildIconFormat, Client } from "../../../core";
import { BaseData } from "../../base/data";
export declare class Guild extends BaseData {
    private data;
    id: Snowflake;
    name: string;
    description: string | null;
    icon: string | null;
    banner: string | null;
    constructor(data: APIGuild, client: Client);
    iconURL(format: GuildIconFormat): string | undefined;
    bannerURL(format: GuildBannerFormat): string | undefined;
    toJson(): APIGuild;
}
