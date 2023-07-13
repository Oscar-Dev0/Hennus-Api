import { APIGuildMember } from "discord-api-types/v10";
import { Guild } from "./index";
import { Client } from "../../core";
import { BaseData } from "../base/data";
import { User } from "../user";
import { MemberFlags } from "../bitfield/flagsbifields";
import { ImageURLOptions } from "@discordjs/rest";

export class GuildMember extends BaseData {


    constructor(private member: APIGuildMember, private guild: Guild, client: Client) {
        super(client);

        Object.defineProperty(this, "member", { value: member });
        Object.defineProperty(this, "guild", { value: guild });
    };

    public user = this.member.user ? new User(this.member.user, this.client) : undefined;
    public nick = this.member.nick ?? undefined;
    public avatar = this.member.avatar ?? undefined;
    private _roles = this.member.roles;
    public joinedTimestamp = this.member.joined_at;
    public premiumSinceTimestamp = this.member.premium_since;
    public deaf = this.member.deaf;
    public mute = this.member.mute;
    public flags = new MemberFlags(this.member.flags).freeze();
    public pending = this.member.pending;
    public communicationDisabledUntilTimestamp = this.member.communication_disabled_until
    
    avatarURL( options: ImageURLOptions ){
        if(this.avatar && this.user ) return this.cdn.guildMemberAvatar(this.guild.id, this.user.id, this.avatar, options);
        return undefined;
    };

    get joinedAt() {
        return this.joinedTimestamp && new Date(this.joinedTimestamp);
    };

    get premiumSince() {
        return this.premiumSinceTimestamp && new Date(this.premiumSinceTimestamp);
    };

    get communicationDisabledUntil(){
        return this.communicationDisabledUntilTimestamp && new Date(this.communicationDisabledUntilTimestamp);
    };

};