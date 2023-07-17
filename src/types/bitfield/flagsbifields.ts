import { ChannelFlags as CF, GuildMemberFlags } from "discord-api-types/v10";
import { BitField, BitFieldResolvable } from ".";

export class MemberFlags extends BitField <GuildMemberFlagsString, GuildMemberFlags>{
    public declare Flags: GuildMemberFlags;
    public declare bitfield: GuildMemberFlags;

    public override resolve(bit?: GuildMemberFlags ): GuildMemberFlags{
        return super.resolve(bit) as GuildMemberFlags;
    };

    public override has(bit: GuildMemberFlags): boolean {
        return super.has(bit);
    };
    
};

export class channelFlags extends BitField<ChannelFlagsStrinmg, CF >{
    public declare Flags: CF;
    public declare bitfield: CF;

    public override resolve(bit?: CF ): CF{
        return super.resolve(bit) as CF;
    };

    public override has(bit: CF): boolean {
        return super.has(bit);
    };
};

type ChannelFlagsStrinmg = keyof typeof CF;
type GuildMemberFlagsString = keyof typeof GuildMemberFlags;