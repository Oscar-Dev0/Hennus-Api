import { GatewayPresenceUpdate } from "discord-api-types/v10";
import { Client } from "../../core";
import { BaseData } from "../base/data";
import { User } from "../user";
import { Guild } from "../guild";

export class Presence extends BaseData {
    public user: User;
    public activities: any[];
    public clientStatus: any;
    public status: string;
    public guildId: string;
    public guild: Guild;

    constructor(private data: GatewayPresenceUpdate, client: Client) {
        super(client);

        Object.defineProperty(this, "data", { value: data });

        const guild = client.guilds.cache.get(this.guildId);

        if (guild) {
            this.guild = guild;
        } else {
            this.guild = {} as Guild;
        }


        this.user = new User(this.data.user as any, this.client);
        this.activities = this.data.activities ?? [];
        this.clientStatus = this.data.client_status;
        this.status = this.data.status ?? "offline";
        this.guildId = this.data.guild_id;
    }




    toJson() {
        return this.data;
    }
}
