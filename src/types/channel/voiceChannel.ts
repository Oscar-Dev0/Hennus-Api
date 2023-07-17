// Import required types and classes
import { APIGuildStageVoiceChannel, APIGuildVoiceChannel } from "discord-api-types/v10";
import { BaseChannel } from "../base/channel";
import { Client } from "../../core";
import { Guild } from "../guild";
import { MessagesManager } from "../../utils";
import { channelFlags, OverwriteBitField } from "../bitfield";

export class BasedVoiceChannel extends BaseChannel {
    // Define properties
    private _cache_messages: MessagesManager;
    public guildId: string = "";
    public guild: Guild;
    public lastMessage: string = "";
    public bitrate: number = 0;
    public nsfw: boolean = false;
    public permission: {
        id: string;
        type: number;
        deny: OverwriteBitField;
        allow: OverwriteBitField;
    }[] = [];
    public position: number | undefined = undefined;
    public parent: string | undefined = undefined;

    // Constructor
    constructor(private data: APIGuildVoiceChannel | APIGuildStageVoiceChannel, client: Client) {
        // Call the constructor of the parent class (BaseChannel)
        super(data, client);

        // Set the value of the "data" property using the "data" parameter passed to the constructor
        Object.defineProperty(this, "data", { value: data });

        // Get the guild using the guildId and set the "guild" property
        const guild = this.client.guilds.cache.get(this.guildId);
        if (guild) this.guild = guild;

        // Create a MessagesManager instance to handle messages in the channel
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
