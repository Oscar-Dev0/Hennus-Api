import { APIGuildCategoryChannel } from "discord-api-types/v10";
import { BaseChannel } from "../base/channel";
import { Client } from "../../core";
import { Guild } from "../guild";

export class BasedCategoryChannel extends BaseChannel {

    private category: APIGuildCategoryChannel;
    public guildId: string;
    public guild: Guild;

    constructor(data: APIGuildCategoryChannel, client: Client) {
        super(data, client);
        this.category = data;
        if(data.guild_id) this.guildId = data.guild_id;

        const guild = client.guilds.get(this.guildId);
        if(guild) this.guild = guild;
    };

    get nsfw(){
        return this.category.nsfw ?? false;
    };

    get permission(){
        return this.category.permission_overwrites ?? [];
    };

    get position(){
        return this.category.position;
    };

    get parent(){
        return this.category.parent_id;
    };

    get toJson(){
        return this.category;
    };
};