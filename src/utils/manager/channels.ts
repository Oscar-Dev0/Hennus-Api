import { Collection } from "@discordjs/collection";
import { BasedCategoryChannel, BasedDmChannel, BasedForumChannel, BasedTextChannel, BasedThreadChannel, BasedVoiceChannel, Channel, UpdateChannel } from "../../types";
import { cacheManager } from "./base";
import { Client } from "../../core";
import { Snowflake } from "discord-api-types/globals";
import { APIChannel, APIGuildCreatePartialChannel, ChannelType, OverwriteType, RESTPostAPIGuildChannelJSONBody, Routes } from "discord-api-types/v10";
import { Permissions } from "../../types/base/permissions";
import { channelConvertidor } from "../functions";

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

    async create(guild_id: Snowflake, data: Omit<RESTPostAPIGuildChannelJSONBody, "permission_overwrites"> & { permission_overwrites?: Array<{ allow?: Permissions, deny?: Permissions, type: OverwriteType; }> }) {
        const channel: APIChannel = await this.client.rest.api.post(Routes.guildChannels(guild_id), { body: data }) as any;
        if(!channel) return undefined;
        if(channel instanceof Error) throw channel;
        return channelConvertidor(channel, this.client);
    };

    async delete(id: Snowflake) {
        this.client.rest.api.delete(Routes.channel(id));
        if (this.cache.has(id)) {
            return this.resolve(id);
        } else return undefined;
    };

    async edit(id: Snowflake, body: UpdateChannel){
        const channel: APIChannel = await this.client.rest.api.patch(Routes.channel(id), { body }) as any;
        if(!channel) return undefined;
        if(channel instanceof Error) throw channel;
        return channelConvertidor(channel, this.client);
    };


};