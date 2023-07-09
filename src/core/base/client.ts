import EventEmitter2  from "eventemitter2";
import { EventsHandler, ListEvents } from "./events";
import { User, Guild } from "../../types";
import { Snowflake } from "discord-api-types/globals";
import { Collection } from "@discordjs/collection";
import { Channels } from "../../utils";

export class BaseClient extends EventEmitter2 { 


    // Informacion general del bot.

    id: Snowflake;
    user: User;
    aplicationId: Snowflake;
    guilds = new Collection<string, Guild>();
    channels = new Channels();

    // Aca vamos a ponerle el type a los eventos.

    override on<T extends keyof ListEvents>(event: T, func: EventsHandler[T]): this
    override on<T extends string>(event: T, func: (...args: unknown[]) => unknown){
        super.on(event, func);
        return this;
    };

    override emit<T extends keyof ListEvents>(event: T, ...args: ListEvents[T]): boolean;
    override emit<T extends string>(event: T, ...args: any[]){
        return super.emit(event, ...args);
    };
     
    constructor(){
        super();

    };

    setUser(user: User){
        this.user = user;
        this.id = user.id;
    };

    setAplication(id: Snowflake){
        this.aplicationId = id;
    };

};
