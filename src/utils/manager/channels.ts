import { Collection } from "@discordjs/collection";
import { Channel } from "../../types";
import { cacheManager } from "./base";
import { Client } from "../../core";
import { Snowflake } from "discord-api-types/globals";

export class ChannelsManager extends cacheManager<string, Channel> {
    constructor(client: Client) {
        super(client);
    };

    private _maps = false;

    setall(map: Channel[]) {
        if (map && Array.isArray(map)) {
            map.forEach((channel) => { if (channel) this.cache.set(channel.id, channel); });
            return true;
        } else {
            return false;
        };
    };

    update(channel: Channel) {
        if (this.cache.has(channel.id)) {
            this.cache.delete(channel.id);
            this.cache.set(channel.id, channel);
        } else {
            this.cache.set(channel.id, channel);
        };
        return this.cache;
    };

    search(guildId: Snowflake) {
        const map = this.cache.filter((x) => { if (!x.isChannelDm() && x.guildId == guildId) return x; return undefined; }).filter((x) => x != undefined);
        return map;
    };

    async fetchall(guildId: Snowflake) {
        let channels = await this.rest.get("guildChannels", guildId);
        if (channels && Array.isArray(channels)) channels.forEach((channel) => {
            if (!this.resolve(channel)) this.cache.set(channel.id, channel);
        });
        return this.cache;
    };

};