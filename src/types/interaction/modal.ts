import { APIModalSubmission, APIModalSubmitInteraction } from "discord-api-types/v10";
import { Client } from "../../core";
import { BasedInteraction } from "../base/interaction";

export class InteractionModal extends BasedInteraction {

    private modaldata: APIModalSubmission;
    public customId: string;
    
    
    constructor(data: APIModalSubmitInteraction,client: Client){
        super(data, client);
        this.modaldata = data.data;
        this.customId = data.data.custom_id;
    };

    get components(){
        return this.modaldata.components.map((x)=> {return x.components[0]});
    };
    
};