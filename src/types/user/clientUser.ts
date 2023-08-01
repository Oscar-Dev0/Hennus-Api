import { APIUser, ActivityType, GatewayActivityUpdateData, GatewayOpcodes, GatewayPresenceUpdateData, GatewaySendPayload, GatewayUpdatePresence, PresenceUpdateStatus } from "discord-api-types/v10";
import { BaseUser } from "./base";
import { Client } from "../../core";

export class ClientUser extends BaseUser {
    constructor(data: APIUser, client: Client){
        super(data, client);
    };

    setActivity(status: Activity, shard?: number | number[]){
        const data: GatewaySendPayload = { op: GatewayOpcodes.PresenceUpdate, d: { since: null,  activities: status.activities, afk: false, status: format(status.status) } };
        if(typeof shard == "number" && Array.isArray(shard)){
            if(Array.isArray(shard)) shard.forEach((value)=> this.client.ws.send(value, data));
            else this.client.ws.send(shard, data)
        };
         this.client.ws.send(0, data);
    };
};

export interface Activity {
    activities: ActivityUpdate[];
    status: PresenceStatus | "online" | "dnd" | "idle" | "invisible" | "offline"; 
}

export interface ActivityUpdate {
    name: string;
    type: ActivityType;
    url?: string | null;
};

export enum PresenceStatus {
    Online = "online",
    Dnd = "dnd",
    Idle = "idle",
    Invisible = "invisible",
    Offline = "offline"
};

function format(data: "online" | "dnd" | "idle" | "invisible" | "offline" | PresenceStatus): PresenceUpdateStatus{
    if(data == "dnd") return PresenceStatus.Dnd as any;
    else if(data == "idle") return PresenceStatus.Idle as any;
    else if(data == "invisible") return PresenceStatus.Invisible as any;
    else if(data == "offline") return PresenceStatus.Offline as any;
    else if(data == "online") return PresenceStatus.Online as any;
    else return data as any;
};