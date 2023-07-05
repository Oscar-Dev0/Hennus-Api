import { GatewayReadyDispatchData } from "discord-api-types/v10";
import { User } from "../user";
import { Client } from "../../core";

export class Ready {

    private data : GatewayReadyDispatchData

    constructor(data: GatewayReadyDispatchData, client: Client){
        Object.defineProperty(this, "data", {
            value: data
        });

        if(!client.id) client.setUser(this.user);
        if(!client.aplicationId) client.setAplication(data.application.id);

    };

    get user(){
        return new User(this.data.user);
    };

    get aplication(){
        return this.data.application;
    };

    get guilds(){
        return this.data.guilds;
    };

    get toJson(){
        return this.data;
    };
};