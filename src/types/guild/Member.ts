import { APIGuildMember } from "discord-api-types/v10";
import { Guild, GuildRoles } from "./index";
import { Client } from "../../core";
import { BaseData } from "../base/data";
import { User } from "../user";
import { MemberFlags } from "../bitfield/flagsbifields";
import { ImageURLOptions } from "@discordjs/rest";
import { Collection } from "@discordjs/collection";
import { MemberRolesManager } from "../../utils";


export class GuildMember extends BaseData {

    public user: User | undefined;
    public nick: string | undefined;
    public avatar: string | undefined;
    private _roles: string[];
    public roles: MemberRolesManager;
    public joinedTimestamp: string | undefined;
    public premiumSinceTimestamp: string | undefined;
    public deaf: boolean;
    public mute: boolean;
    public flags: MemberFlags;
    public pending: boolean;
    public communicationDisabledUntilTimestamp: string | undefined;

    constructor(private member: APIGuildMember, private guild: Guild, client: Client) {

        super(client);

        Object.defineProperty(this, "member", { value: member });
        Object.defineProperty(this, "guild", { value: guild });

        this.user = member.user ? new User(member.user, this.client) : undefined;


        this.nick = member.nick ?? undefined;
        this.avatar = member.avatar ?? undefined;
        this._roles = member.roles;
        this.roles = new MemberRolesManager(client, guild.id, this.user?.id ?? '');
        this.roles.cache.concat(this.guild.roles.searchlist(this._roles));
        this.joinedTimestamp = member.joined_at;
        this.premiumSinceTimestamp = member.premium_since ?? undefined;
        this.deaf = member.deaf;
        this.mute = member.mute;
        this.flags = new MemberFlags(member.flags);
        this.pending = member.pending ?? false;
        this.communicationDisabledUntilTimestamp = member.communication_disabled_until ?? undefined;
    }


    avatarURL(options: ImageURLOptions) {
        if (this.avatar && this.user) return this.cdn.guildMemberAvatar(this.guild.id, this.user.id, this.avatar, options);
        return undefined;
    }

    get joinedAt() {
        return this.joinedTimestamp && new Date(this.joinedTimestamp);
    }

    get premiumSince() {
        return this.premiumSinceTimestamp && new Date(this.premiumSinceTimestamp);
    }

    get communicationDisabledUntil() {
        return this.communicationDisabledUntilTimestamp && new Date(this.communicationDisabledUntilTimestamp);
    };

    toString() {
        if (this.user) return `<@${this.user.id}>`;
        else return "";
    };
};
