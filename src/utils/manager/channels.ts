import { Channel, Overwrite, UpdateChannel } from "../../types";
import { cacheManager } from "./base";
import { Client } from "../../core";
import { Snowflake } from "discord-api-types/globals";
import { APIChannel, APIGuildChannelResolvable, OverwriteType, RESTPostAPIGuildChannelJSONBody, Routes } from "discord-api-types/v10";
import { Permissions } from "../../types/base/permissions";
import { channelConvertidor } from "../functions";
import { DistributiveOmit, DistributivePick, StrictPartial } from "discord-api-types/utils/internals";

export class ChannelsManager extends cacheManager<string, Channel> {
    constructor(client: Client) {
        super(client);
    };

    private _maps = false;

    setall(map: Channel[]) {
        if (map && Array.isArray(map)) {
            for(const channel of map){
                if (channel) this.cache.set(channel.id, channel);
            };
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

    async createGuildChannel(guild_id: Snowflake, data: CreateGuildChannel ) {
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




export type CreateGuildChannel = DistributiveOmit<GuildCreatePartialChannel, 'id'>;


type GuildCreatePartialChannel = StrictPartial<DistributivePick<APIGuildChannelResolvable, 'type' | 'topic' | 'nsfw' | 'bitrate' | 'user_limit' | 'rate_limit_per_user' | 'default_auto_archive_duration' | 'position' | 'rtc_region' | 'video_quality_mode' | 'flags' | 'default_reaction_emoji' | 'available_tags' | 'default_sort_order' | 'default_forum_layout' | 'default_thread_rate_limit_per_user'>> & {
    name: string;
    id?: number | string | undefined;
    parent_id?: number | string | null | undefined;
    permission_overwrites?: Overwrite[] | undefined;
};