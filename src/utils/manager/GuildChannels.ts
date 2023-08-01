import { Client } from "../../core";
import { Guild } from "../../types";
import { ChannelsManager, CreateGuildChannel } from "./channels";

export class GuildChannelsManager extends ChannelsManager {

    constructor(client: Client, guild: Guild) {
        super(client);
        Object.defineProperty(this, "guild", { value: guild });
    };

   
    async create(channel: CreateGuildChannel) {
        //@ts-ignore
        return await super.createGuildChannel(this.guild.id, channel);
      };
};



