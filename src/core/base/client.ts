import EventEmitter2 from "eventemitter2";
import { EventsHandler, ListEvents } from "./events";
import { User, ClientUser, IntentsBitField } from "../../types";
import { Snowflake } from "discord-api-types/globals";
import { ChannelsManager, GuildsManager, UsersManager } from "../../utils";
import { HennusRest } from "../../rest";
import { HennusWS } from "../../ws";
import { commandsManger } from "./aplication";
import { APIUser } from "discord-api-types/v10";
import { Client } from "../session";

export class BaseClient extends EventEmitter2 {

    constructor() {
        super();
    };

    // Informacion general del bot.

    id: Snowflake;
    token: string;
    user: ClientUser;
    guilds: GuildsManager;
    channels: ChannelsManager;
    users: UsersManager;
    intents = new IntentsBitField();
    commands: commandsManger;
    aplicationId: Snowflake;
    rest: HennusRest;
    wss: HennusWS;

    // Aca vamos a ponerle el type a los eventos.

    override on<T extends keyof ListEvents>(event: T, func: EventsHandler[T]): this
    override on<T extends string>(event: T, func: (...args: unknown[]) => unknown) {
        super.on(event, func);
        return this;
    };

    override emit<T extends keyof ListEvents>(event: T, ...args: ListEvents[T]): boolean;
    override emit<T extends string>(event: T, ...args: any[]) {
        return super.emit(event, ...args);
    };

    private set(client: Client,  data: { user?: APIUser, aplicationid?: string }){
        if(data.user){
            Object.defineProperty(this, "user", {value: new ClientUser(data.user, client)});
            Object.defineProperty(this, "id", { value: data.user.id });
        };
        if (data?.aplicationid && typeof data.aplicationid ==='string') Object.defineProperty(this, "aplicationId", { value: data.aplicationid })
    };
};
