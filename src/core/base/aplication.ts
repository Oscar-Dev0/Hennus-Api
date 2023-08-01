import { Snowflake } from "discord-api-types/globals";
import { ApplicationCommandData } from "../../types";
import { Permissions } from "../../types/base/permissions";
import { HennusError, errorCodes } from "../Error";
import { Client } from "../session";
import { RESTPostAPIApplicationCommandsJSONBody, Routes } from "discord-api-types/v10";

export class commandsManger {
    constructor( private _client: Client ) {
    };

    async set( commands: ApplicationCommandData[], guildId?: Snowflake  ){
        if(!Array.isArray(commands)) return undefined;
            const data = await this._client.rest.api.put(this.paths(guildId), {
            body: commands.map(c => this.format(c)),
          });
          return data;
    };

    async create( command: ApplicationCommandData ){
        const cmd = this.format(command);
       return await this._client.rest.post("applicationCommands", cmd, this._client.aplicationId );
    };

    async delete(id: Snowflake, guildId?: Snowflake){
        return await this._client.rest.api.delete(this.paths(guildId, id));
    };

    private format(cmd: ApplicationCommandData): RESTPostAPIApplicationCommandsJSONBody{
        const regex = RegExp(/[A-Z]/g);
        if( regex.test(cmd.name) ) throw new HennusError(errorCodes.CommandNameUpperCase); 
        if( cmd.name.length <= 0 && cmd.name.length > 32) throw new HennusError(errorCodes.InvalidCommandNameLength);
        if( cmd.default_member_permissions && Array.isArray( cmd.default_member_permissions ) ) cmd.default_member_permissions = cmd.default_member_permissions.reduce((a,b)=> a | b, 0 as Permissions);

        return {
            name : cmd.name,
            //@ts-ignore
            description : cmd?.description ,
            options : cmd.options ?? [],
            type: cmd.type ?? 1,
            nsfw: cmd.nsfw ?? false,
            name_localizations: cmd.name_localizations,
            description_localizations: cmd.description_localizations,
            default_permission: cmd.default_permission ?? false,
            dm_permission: cmd.dm_permission,
            default_member_permissions: cmd.default_member_permissions? cmd.default_member_permissions.toString() :undefined,
        };
    };

    private paths(guild_id?: Snowflake, id?: Snowflake){
        if(id) {
            if(guild_id) return Routes.applicationGuildCommand(this._client.aplicationId, guild_id, id);
            else return Routes.applicationCommand(this._client.aplicationId, id);
        } else {
            if(guild_id) return Routes.applicationGuildCommands(this._client.aplicationId, guild_id);
            else return Routes.applicationCommands(this._client.aplicationId);
        };
    };
};