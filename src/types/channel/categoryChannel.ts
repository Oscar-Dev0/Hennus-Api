import { APIGuildCategoryChannel } from "discord-api-types/v10";
import { BaseChannel } from "../base/channel";
import { Client } from "../../core";
import { Guild } from "../guild";
import { channelFlags, OverwriteBitField } from "../bitfield";
import { UpdateChannel, UpdateTextAnnouncementChannel } from ".";
import { errorCodes, HennusError } from "../../core/Error";

export class BasedCategoryChannel extends BaseChannel {

    public guildId: string = "";
    public guild: Guild;
    public nsfw: boolean = false;
    public permission: { id: string; type: number; deny: OverwriteBitField; allow: OverwriteBitField }[] = [];
    public position: number;
    public parent: string | undefined;

    constructor(private data: APIGuildCategoryChannel, client: Client) {
        super(data, client);

        Object.defineProperty(this, "data", { value: data });

        const guild = client.guilds.cache.get(this.guildId);
        if (guild) this.guild = guild;
    }


    toJson() {
        return this.data;
    };

    async edit(data: Pick<UpdateTextAnnouncementChannel, "name" | "permission_overwrites" | "position">) {
        if (data.name && (data.name.length >= 1 && data.name.length <= 100)) throw new HennusError(errorCodes.ChannelNameLength);
        return await this.client.channels.edit(this.id, data) as BasedCategoryChannel;
    };
};
