import { Client } from "../../core";

export class BaseData {
    public client: Client;

    constructor(client: Client){
        this.client = client;
    };
    
};