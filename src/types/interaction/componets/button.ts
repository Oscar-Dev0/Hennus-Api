import { APIMessageButtonInteractionData, APIMessageComponentInteraction, ComponentType } from "discord-api-types/v10";
import { ComponentsInteractionBased } from "./base";
import { Client } from "../../../core";

export class InteractionButton extends ComponentsInteractionBased {
    
    private btnData: APIMessageButtonInteractionData;

    constructor(data: APIMessageComponentInteraction, client: Client ){
        super(data, client)
        if(data.data.component_type == ComponentType.Button) this.btnData = data.data;
    };
};