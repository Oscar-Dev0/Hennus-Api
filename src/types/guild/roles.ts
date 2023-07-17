// Import required types and classes
import { APIRole } from "discord-api-types/v10";
import { Client } from "../../core";
import { BaseData } from "../base/data";
import { Permissions } from "../base/permissions";
import { PermissionsBitField } from "../bitfield";
import { BaseImageURLOptions } from "@discordjs/rest";

// Declare the class
export class GuildRoles extends BaseData {
    // Properties of the class based on the APIRole data
    public id: string;
    public name: string;
    public color: number;
    public hoist: boolean;
    public position: number;
    public permissions: PermissionsBitField;
    public managed: boolean;
    public mentionable: boolean;
    public icon: string | undefined;

    constructor(private data: APIRole, client: Client) {
        // Call the constructor of the parent class (BaseData)
        super(client);

        // Set the values of the properties using the "data" parameter passed to the constructor
        Object.defineProperty(this, "data", {
            value: data,
        });

        // Set properties based on the APIRole data
        this.id = data.id;
        this.name = data.name;
        this.color = data.color || 0;
        this.hoist = data.hoist;
        this.position = Number(data.position);
        this.permissions = new PermissionsBitField(Number(data.permissions));
        this.managed = data.managed;
        this.mentionable = data.mentionable;
        this.icon = data.icon ?? undefined;
    }

    // Method to get the URL for the role's icon
    iconURL(options?: BaseImageURLOptions) {
        if (!this.icon) return undefined;
        return this.cdn.roleIcon(this.id, this.icon, options);
    }

    // Method to convert the role data to JSON
    toJson() {
        return this.data;
    }
}
