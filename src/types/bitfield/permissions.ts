import { PermissionFlagsBits } from "discord-api-types/v10";
import { BitField, BitFieldResolvable, PermissionsString } from ".";
import { Permissions } from "../base/permissions"


export class PermissionsBitField extends BitField<PermissionsString> {
    public declare Flags: typeof Permissions;
    
    public static All = Object.values(PermissionFlagsBits).reduce((all, p) => all | p, BigInt(0));

    public override resolve(bit?: BitFieldResolvable<PermissionsString, number>): number {
      //@ts-ignore 
      return super.resolve(bit);
    };
    public override has(data: Permissions): boolean{
      return super.has(data);
    };
    public override add(...data: Permissions[]){
      return super.add(...data);
    };
};