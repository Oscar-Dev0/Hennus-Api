// Import required types and classes
import { APIGuildCategoryChannel } from "discord-api-types/v10";
import { BaseChannel } from "../base/channel";
import { Client } from "../../core";
import { Guild } from "../guild";
import { channelFlags, OverwriteBitField } from "../bitfield";

// Declare the class
export class BasedCategoryChannel extends BaseChannel {
    // Properties of the class based on the APIGuildCategoryChannel data
    public guildId: string = "";
    public guild: Guild;
    public nsfw: boolean = false;
    public permission: { id: string; type: number; deny: OverwriteBitField; allow: OverwriteBitField }[] = [];
    public position: number;
    public parent: string | undefined;

    constructor(private data: APIGuildCategoryChannel, client: Client) {
        // Call the constructor of the parent class (BaseChannel)
        super(data, client);

        // Set the values of the properties using the "data" parameter passed to the constructor
        Object.defineProperty(this, "data", { value: data });

        // Find and set the associated guild using the guild ID
        const guild = client.guilds.cache.get(this.guildId);
        if (guild) this.guild = guild;
    }

    // Method to convert the channel data to JSON
    toJson() {
        return this.data;
    }

    // Private method to patch (update) the channel data
    private _patch(data: APIGuildCategoryChannel) {
        if (data.name !== this.data.name) this.name = data.name;
        if (data.flags !== this.data.flags) this.flags = new channelFlags(data.flags).freeze;
        if (data.parent_id !== this.data.parent_id) this.parent = data.parent_id ?? undefined;
        if (data.nsfw !== this.data.nsfw) this.nsfw = data.nsfw ?? false;
        if (data.position !== this.data.position) this.position = data.position;
        if (Array.isArray(data.permission_overwrites))
            this.permission = (data.permission_overwrites ?? []).map(({ id, type, deny, allow }) => {
                return { id, type, deny: new OverwriteBitField(Number(deny)), allow: new OverwriteBitField(Number(allow)) };
            });

        this.data = data;
        return this;
    }
}
