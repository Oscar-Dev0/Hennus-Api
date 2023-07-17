// Import required types and classes
import { APINewsChannel, APITextChannel } from "discord-api-types/v10";
import { BaseChannel } from "../base/channel";
import { Client } from "../../core";
import { Guild } from "../guild";
import { MessagesManager } from "../../utils";
import { channelFlags, OverwriteBitField } from "../bitfield";

export class BasedTextChannel extends BaseChannel {
    public topic: string = "";
    public nsfw: boolean = false;
    public permission: { id: string; type: number; deny: OverwriteBitField; allow: OverwriteBitField }[] = [];
    public position: number | undefined = undefined;
    public parent: string | undefined = undefined;
    public guildId: string = "";
    public lastMessage: string | undefined = undefined;
    public guild: Guild;
    private _cache_messages: MessagesManager;

    constructor(private data: APITextChannel | APINewsChannel, client: Client) {
        // Call the constructor of the parent class (BaseChannel)
        super(data, client);

        // Set the values of the properties using the "data" parameter passed to the constructor
        Object.defineProperty(this, "data", { value: data });

        // Set additional properties
        this.topic = this.data.topic ?? "";
        this.nsfw = this.data.nsfw ?? false;
        this.permission = (this.data.permission_overwrites ?? []).map(({ id, type, deny, allow }) => ({
            id,
            type,
            deny: new OverwriteBitField(Number(deny)),
            allow: new OverwriteBitField(Number(allow)),
        }));
        this.position = this.data.position;
        this.parent = this.data.parent_id ?? undefined;
        this.guildId = this.data.guild_id ?? "";

        const guild = client.guilds.cache.get(this.guildId);
        if (guild) this.guild = guild;

        this.lastMessage = this.data.last_message_id ?? undefined;

        // Create MessagesManager instance
        this._cache_messages = new MessagesManager(this.client);
    }

    // Getters to fetch all messages in the channel
    get messages() {
        this._cache_messages.fetchall(this.id);
        return this._cache_messages;
    }

    // Method to convert the channel data to JSON
    toJson() {
        return this.data;
    }


}
