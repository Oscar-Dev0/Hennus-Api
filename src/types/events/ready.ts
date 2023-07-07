import { GatewayReadyDispatchData } from "discord-api-types/v10";
import { User } from "../user";
import { Client } from "../../core";

export class Ready {

    private data : GatewayReadyDispatchData;
    public readonly client!: Client;

    constructor(data: GatewayReadyDispatchData, client: Client){
        Object.defineProperty(this, "data", {
            value: data
        });
        Object.defineProperty(this, "client",{
            value: client
        })
        
    };

    get user(){
        return new User(this.data.user, this.client);
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