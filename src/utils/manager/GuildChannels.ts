import { RESTPostAPIGuildChannelJSONBody, OverwriteType } from "discord-api-types/v10";
import { Client } from "../../core";
import { Guild } from "../../types";
import { Permissions } from "../../types/base/permissions";
import { ChannelsManager } from "./channels";

export class GuildChannelsManager extends ChannelsManager {

    constructor(client: Client, guild: Guild) {
        super(client);
        Object.defineProperty(this, "guild", { value: guild });
    };

    //@ts-ignore
    async create(channel: Omit<RESTPostAPIGuildChannelJSONBody, "permission_overwrites"> & { permission_overwrites?: { allow?: Permissions | undefined; deny?: Permissions | undefined; type: OverwriteType; }[] | undefined; }){
        //@ts-ignore
        return await super.create(this.guild.id, channel);
    };
};