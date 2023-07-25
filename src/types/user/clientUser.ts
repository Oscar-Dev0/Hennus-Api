import { APIUser, GatewayActivityUpdateData, GatewayOpcodes, GatewayPresenceUpdateData, GatewaySendPayload, GatewayUpdatePresence, PresenceUpdateStatus } from "discord-api-types/v10";
import { BaseUser } from "./base";
import { Client } from "../../core";

export class ClientUser extends BaseUser {
    constructor(data: APIUser, client: Client){
        super(data, client);
    };

    setActivty(status: { activities: GatewayActivityUpdateData[]; status: PresenceUpdateStatus; }, shard?: number | number[]){
        const data: GatewaySendPayload = { op: GatewayOpcodes.PresenceUpdate, d: { since: null,  activities: status.activities, afk: false, status: status.status } };
        if(typeof shard == "number" && Array.isArray(shard)){
            if(Array.isArray(shard)) shard.forEach((value)=> this.client.wss.send(value, data));
            else this.client.wss.send(shard, data)
        };
         this.client.wss.send(0, data);
    };
};
