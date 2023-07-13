import { BitField, BitFieldResolvable, PermissionsString } from ".";
import { Permissions } from "../base/permissions";

export class OverwriteBitField extends BitField<PermissionsString> {
    public override Flags: typeof Permissions;
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