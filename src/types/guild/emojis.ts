import { APIEmoji, Snowflake } from "discord-api-types/v10";
import { Client } from "../../core";
import { BaseData } from "../base/data";
import { Guild } from ".";
import { User } from "../user";

export class GuildEmojis extends BaseData {

    public name: string;
    public id?: Snowflake = undefined;
    public animated: boolean = false;
    private _roles: string[] = [];
    public available: boolean = false;
    public managed: boolean = false;
    public require_colons: boolean = false;
    public user?: User;
    public guild: Guild;

    constructor(emoji: APIEmoji, guild: Guild, client: Client) {
        super(client);
        this.name = emoji.name!;
        this.id = emoji.id ?? undefined;
        this.animated = emoji.animated ?? false;
        this._roles = emoji.roles ?? [];
        this.available = emoji.available ?? false;
        this.managed = emoji.managed ?? false;
        this.require_colons = emoji.require_colons ?? false;
        this.user = emoji.user ? new User(emoji.user, client) : undefined;
        Object.defineProperty(this, "guild", { value: guild });
    };

    get roles(){
        return this.guild.roles.searchlist(this._roles).map((x)=> x);
    };

    toString() {
        if (this.animated && this.id && this.name) return `<a:${this.name}:${this.id}>`;
        else if(!this.animated && this.id && this.name) return `<:${this.name}:${this.id}>`;
        else if(!this.animated && !this.id && this.name) return this.name;
        else return "";
    };

    
};