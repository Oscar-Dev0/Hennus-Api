import {  APIMessage, InteractionResponseType, RESTPostAPIApplicationCommandsJSONBody, Routes } from "discord-api-types/v10";
import { Message, MessageChannelOptions, MessageInteractionOptions, interactionData, interactionResponse, interactionResult } from "../../../types";
import { RawFile } from "@discordjs/rest";


export interface postReturn {
    channelMessages: APIMessage;
    interactionCallback: unknown;
    applicationCommands: interactionResult[]

};

export interface postOptions {
    channelMessages: [ channelId: string ];
    interactionCallback: [ interactionId: string, interactionToken: string ];
    applicationCommands: [ applicationId: string ];
};

interface postLink {
    channelMessages: `/channels/${string}/messages`;
    interactionCallback: `/interactions/${string}/${string}/callback`;
    applicationCommands: `/applications/${string}/commands`;
};

interface postType<T extends keyof postOptions>{
    op: T;
    d: postOptions[T];
    link: postLink[T];
};

export function postRoutes< T extends keyof postOptions,D extends postType<T>>(type: D['op'], ...args: D["d"] ): D["link"]{
    const router = Routes[type];
    //@ts-ignore
    return router(...args) as D["link"];
};

export interface postNode {
    channelMessages: { return: Message, args: MessageChannelOptions | { files: RawFile[], body?: MessageChannelOptions }, data: postOptions["channelMessages"]};
    interactionCallback: { return: any, args:{ body: interactionResponse } | { files?: RawFile[], body: { type: InteractionResponseType.ChannelMessageWithSource; data: MessageInteractionOptions; } }, data: postOptions['interactionCallback'] };
    applicationCommands: { return: interactionResult, args: RESTPostAPIApplicationCommandsJSONBody , data: postOptions['applicationCommands'] }
};