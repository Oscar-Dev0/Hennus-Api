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
import { EmojisManager } from "../../utils/manager/emojis";

export class BaseClient extends EventEmitter2 {

    constructor() {
        super();
    };

    // Informacion general del bot.

    id: Snowflake;
    token: string;
    intents = new IntentsBitField();
    user: ClientUser;

    //Collections
    guilds: GuildsManager;
    channels: ChannelsManager;
    users: UsersManager;
    emojis: EmojisManager;

    //@ts-ignore
    aplication: { commands: commandsManger } = {};
    aplicationId: Snowflake;
    rest: HennusRest;
    ws: HennusWS;

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

};
