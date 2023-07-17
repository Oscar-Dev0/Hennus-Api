// Import required types and classes
import { APIGuild, GatewayGuildCreateDispatchData } from "discord-api-types/v10";
import { BaseData } from "../base/data";
import { Client } from "../../core";
import { ImageURLOptions } from "@discordjs/rest";
import { MembersManager, RolesManager } from "../../utils";

// Declare the class
export class Guild extends BaseData {
    // Properties of the class based on the APIGuild data
    public id: string = "";
    public name: string;
    public description: string | undefined;
    public icon: string | undefined = undefined;
    public banner: string | undefined = undefined;
    public memberCount: number = 0;

    constructor(private data: APIGuild, client: Client) {
        // Call the constructor of the parent class (BaseData)
        super(client);

        // Set the values of the properties using the "data" parameter passed to the constructor
        Object.defineProperty(this, "data", { value: data });
        this.id = data.id;
        this.name = data.name;
        this.description = data.description ?? undefined;
        this.memberCount = data.approximate_member_count ?? 0;
        this.icon = data.icon ?? undefined;
        this.banner = data.banner ?? undefined;
    }

    // Method to get the channels of the guild
    public get channels() {
        return this.client.channels.search(this.id);
    }

    // Create a MembersManager instance to work with members of the guild
    public members = new MembersManager(this.client, this.id);

    // Create a RolesManager instance to work with roles of the guild
    public roles = new RolesManager(this.client);

    // Method to get the URL for the guild's icon
    iconURL(options?: ImageURLOptions) {
        if (!this.icon) return undefined;
        return this.cdn.icon(this.id, this.icon, options);
    }

    // Method to get the URL for the guild's banner
    bannerURL(options?: ImageURLOptions) {
        if (!this.banner) return undefined;
        return this.cdn.banner(this.id, this.banner, options);
    }

    // Method to convert the guild data to JSON
    toJson() {
        return this.data;
    }

    // Private method to patch (update) the guild data
    private _patch(data: APIGuild) {
        if (data.name != this.data.name) this.name = data.name;
        if (data.description != this.data.description) this.description = data.description ?? undefined;
        if (data.icon != this.data.icon) this.icon = data.icon ?? undefined;
        if (data.banner != this.data.banner) this.banner = data.banner ?? undefined;
        if (data.approximate_member_count != this.data.approximate_member_count)
            this.memberCount = data.approximate_member_count ?? 0;

        // Update the "data" property if the new data differs from the current data
        if (this.data != data) Object.defineProperty(this, "data", { value: data });

        return this;
    }
}

// Export other related classes
export * from "./Member";
export * from "./roles";
