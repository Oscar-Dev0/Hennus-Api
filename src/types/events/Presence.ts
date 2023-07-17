import { GatewayPresenceUpdate } from "discord-api-types/v10";
import { Client } from "../../core";
import { BaseData } from "../base/data";
import { User } from "../user";
import { Guild } from "../guild";

export class Presence extends BaseData {
        // Propiedades
        public user: User;
        public activities: any[];
        public clientStatus: any;
        public status: string;
        public guildId: string;
        public guild: Guild;
        
    constructor(private data: GatewayPresenceUpdate, client: Client) {
        super(client);

        // Define la propiedad "data" como no enumerable para evitar cambios no deseados
        Object.defineProperty(this, "data", { value: data });

        // Obtiene la instancia del servidor (guild) a partir del ID del servidor proporcionado en los datos
        const guild = client.guilds.cache.get(this.guildId);

        // Asigna la instancia del servidor (guild) si existe, de lo contrario, crea un objeto vacío
        if (guild) {
            this.guild = guild;
        } else {
            this.guild = {} as Guild;
        }

        // Propiedades
        this.user = new User(this.data.user as any, this.client);
        this.activities = this.data.activities ?? [];
        this.clientStatus = this.data.client_status;
        this.status = this.data.status ?? "offline";
        this.guildId = this.data.guild_id;
    }



    // Método para convertir la instancia en un objeto JSON
    toJson() {
        return this.data;
    }
}
