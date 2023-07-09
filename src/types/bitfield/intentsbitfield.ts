import { GatewayIntentBits } from "discord-api-types/v10";
import { BitField, BitFieldResolvable } from ".";
export type GatewayIntentsString = keyof typeof GatewayIntentBits;

export class IntentsBitField extends BitField<GatewayIntentsString>{
  public override Flags: typeof GatewayIntentBits;
  public override resolve(bit?: BitFieldResolvable<GatewayIntentsString, number>): number {
    //@ts-ignore 
    return super.resolve(bit);
  };
  public override has(data: GatewayIntentBits): boolean{
    return super.has(data);
  };
  public override add(...data: GatewayIntentBits[]){
    return super.add(...data);
  };
};