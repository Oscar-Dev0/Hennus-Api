import { Snowflake } from "discord-api-types/globals";
import { cacheManager } from "./base";
import { Client } from "../../core";
import { GuildEmojis } from "../../types";

export class EmojisManager extends cacheManager<Snowflake, GuildEmojis> {
    constructor(client: Client) {
        super(client);
    };


    setall(emojis: GuildEmojis[]){
        if (emojis && Array.isArray(emojis)) {
            emojis.forEach((emoji) => { if (emoji) this.cache.set(emoji.id ?? emoji.name, emoji); });
            return true;
        } else {
            return false;
        };
    };

    search(guildId: Snowflake) {
        const map = this.cache.filter((x) => { if (x.guild.id == guildId) return x; return undefined; }).filter((x) => x != undefined);
        return map;
    };
};