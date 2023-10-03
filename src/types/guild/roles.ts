import { APIRole } from "discord-api-types/v10";
import { Client } from "../../core";
import { BaseData } from "../base/data";
import { Permissions } from "../base/permissions";
import { PermissionsBitField } from "../bitfield";
import { BaseImageURLOptions } from "@discordjs/rest";

export class GuildRoles extends BaseData {

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

        super(client);

        Object.defineProperty(this, "data", {
            value: data,
        });


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


    iconURL(options?: BaseImageURLOptions) {
        if (!this.icon) return undefined;
        return this.cdn.roleIcon(this.id, this.icon, options);
    }


    toJson() {
        return this.data;
    };
    toString() {
        if (this.id) return `<@&${this.id}>`;
        else return "";
    };

    get hexColor() {
        return `#${this.color.toString(16).padStart(6, '0')}`;
    };
  
};
