import { HennusRest } from "../../rest";
import { interactionData } from "../../types";
import { Permissions } from "../../types/base/permissions";
import { HennusError, errorCodes } from "../Error";
import { Client } from "../session";

export class commandsManger {
    constructor( private _client: Client ) {
    };

    setbulk( commands: interactionData[]  ){
    };

    async set( command: interactionData ){
        const regex = RegExp(/[A-Z]/g);
       if( regex.test(command.name) ) throw new HennusError(errorCodes.CommandNameUpperCase); 
       if( command.name.length <= 0 && command.name.length > 32) throw new HennusError(errorCodes.InvalidCommandNameLength);
       if( command.default_member_permissions && Array.isArray( command.default_member_permissions ) ) command.default_member_permissions = command.default_member_permissions.reduce((a,b)=> a | b, 0 as Permissions);
       if( command.default_member_permissions ) command.default_member_permissions = String(command.default_member_permissions) as any;

       return await this._client.rest.post("applicationCommands", command as any, this._client.aplicationId );
    }
};