import { APIGuildCategoryChannel } from "discord-api-types/v10";
import { BaseChannel } from "../base/channel";
import { Client } from "../../core";
import { Guild } from "../guild";
import { channelFlags, OverwriteBitField } from "../bitfield";

export class BasedCategoryChannel extends BaseChannel {

    constructor( private data: APIGuildCategoryChannel, client: Client) {
        super(data, client);

        Object.defineProperty( this, "data", { value: data } );

        const guild = client.guilds.cache.get(this.guildId);
        if(guild) this.guild = guild;
    };

    public guildId = this.data.id ?? "";
    public guild: Guild;
    public nsfw = this.data.nsfw ?? false;
    public permission = (this.data.permission_overwrites ?? []).map(({id, type, deny, allow})=> { return{ id, type, deny: new OverwriteBitField(Number(deny) ), allow:  new OverwriteBitField(Number(allow))} } );
    public position = this.data.position;
    public parent = this.data.parent_id ?? undefined;

    toJson(){
        return this.data;
    };

    private _patch(data: APIGuildCategoryChannel){
        if(data.name !== this.data.name) this.name = data.name;
        if(data.flags !== this.data.flags) this.flags = new channelFlags(data.flags).freeze();
        if(data.parent_id !== this.data.parent_id) this.parent = data.parent_id ?? undefined;
        if(data.nsfw !== this.data.nsfw) this.nsfw = data.nsfw ?? false;
        if(data.position !== this.data.position) this.position = data.position; 
        if(Array.isArray(data.permission_overwrites)) this.permission = (data.permission_overwrites ?? []).map(({id, type, deny, allow})=> { return{ id, type, deny: new OverwriteBitField(Number(deny) ), allow:  new OverwriteBitField(Number(allow))} } );
        this.data = data;
        return this;
    };

};