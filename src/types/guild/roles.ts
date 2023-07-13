import { APIRole } from "discord-api-types/v10";
import { Client } from "../../core";
import { BaseData } from "../base/data";
import { Permissions } from "../base/permissions";
import { PermissionsBitField } from "../bitfield";
import { BaseImageURLOptions } from "@discordjs/rest";

export class GuildRoles extends BaseData {

    constructor( private data: APIRole, client: Client){
        super(client);
        Object.defineProperty(this, "data", {
            value: data,
        });
    };

    public id = this.data.id;
    public name = this.data.name;
    public color = this.data.color || 0; 
    public hoist = this.data.hoist;
    public position = Number(this.data.position);
    public permissions = new PermissionsBitField(Number(this.data.permissions));
    public managed = this.data.managed;
    public mentionable = this.data.mentionable;
    public icon = this.data.icon;
    
    public iconURL(options?: BaseImageURLOptions){
        if(!this.icon)  return undefined;
        return this.cdn.roleIcon(this.id, this.icon, options);
    };

    toJson(){
        this.data;    
    };
};