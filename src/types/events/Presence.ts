import { GatewayPresenceUpdate } from "discord-api-types/v10";
import { Client } from "../../core";
import { BaseData } from "../base/data";
import { User } from "../user";
import { Guild } from "../guild";

export class Presence extends BaseData {
    constructor(private data: GatewayPresenceUpdate, client: Client){
        super(client);
        Object.defineProperty(this, "data", { value: data });

        const guild = client.guilds.cache.get(this.guildId);

        if(guild) this.guild = guild;
        else this.guild = {} as Guild;
    };

    public user = new User(this.data.user as any, this.client);
    public activities = this.data.activities ?? [];
    public clientStatus = this.data.client_status;
    public status = this.data.status;
    public guildId = this.data.guild_id;
    public guild: Guild;

    toJson(){
        return this.data;
    };
};