import { APIMessageComponentInteraction, ComponentType } from "discord-api-types/v10";
import { BasedInteraction } from "../../base/interaction";
import { Client } from "../../../core";
import { InteractionButton } from "./button";
import { InteractionSelectAny } from "./anyselect";


export class ComponentsInteractionBased extends BasedInteraction {

   public  customId: string;
   public componetType: ComponentType

    constructor(data: APIMessageComponentInteraction, client: Client){
        super(data, client);
        this.customId = data.data.custom_id;
        this.componetType = data.data.component_type;
    };

    isButton(): this is InteractionButton{
        return this.componetType == ComponentType.Button;
    };

    isSelect(): this is InteractionSelectAny{
        return this.componetType != ComponentType.Button;
    };
};