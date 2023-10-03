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

    public guild: Guild;
    public user: User | undefined;
    public nick: string | undefined;
    public avatar: string | undefined;
    private _roles: string[];
    public joinedTimestamp: string | undefined;
    public premiumSinceTimestamp: string | undefined;
    public deaf: boolean;
    public mute: boolean;
    public flags: MemberFlags;
    public pending: boolean;
    public communicationDisabledUntilTimestamp: string | undefined;

    constructor(private member: APIGuildMember, guild: Guild, client: Client) {

        super(client);

        Object.defineProperty(this, "member", { value: member });
        Object.defineProperty(this, "guild", { value: guild });

        this.user = member.user ? new User(member.user, this.client) : undefined;


        this.nick = member.nick ?? undefined;
        this.avatar = member.avatar ?? undefined;
        this._roles = member.roles;

        this.joinedTimestamp = member.joined_at;
        this.premiumSinceTimestamp = member.premium_since ?? undefined;
        this.deaf = member.deaf;
        this.mute = member.mute;
        this.flags = new MemberFlags(member.flags);
        this.pending = member.pending ?? false;
        this.communicationDisabledUntilTimestamp = member.communication_disabled_until ?? undefined;
    };

    get roles() {
        const roles = new MemberRolesManager(this.client, this.guild.id, this.user?.id ?? '');
        const map = this.guild.roles.searchlist(this._roles);
        roles.setall(map);
        return roles;
    };


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

    get displayHexColor() {
        return this.roles.color?.hexColor ?? '#000000';
    };

    toString() {
        if (this.user) return `<@${this.user.id}>`;
        else return "";
    };
};
