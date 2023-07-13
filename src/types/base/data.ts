import { Client } from "../../core";

export class BaseData {
    constructor( public readonly client: Client){
        Object.defineProperty(this, "client", { value: client } );
    };

    get cdn(){
        return this.client.rest.cdn;
    };

    get rest(){
        return this.client.rest;
    };
    
};