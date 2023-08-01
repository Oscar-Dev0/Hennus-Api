import {  APIMessage, InteractionResponseType, RESTPostAPIApplicationCommandsJSONBody, Routes } from "discord-api-types/v10";
import { Message, MessageChannelOptions, MessageInteractionOptions, interactionResponse, interactionResult } from "../../../types";
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


export function postRoutes<T extends keyof postOptions>(
    type: T,
    ...args: postOptions[T]
  ): postLink[T] {
    const router = Routes[type];
    //@ts-ignore
    return router(...args) as postLink[T];
  };
  
export interface postNode {
    channelMessages: { return: Message, args: MessageChannelOptions | { files: RawFile[], body?: MessageChannelOptions }, data: postOptions["channelMessages"]};
    interactionCallback: { return: any, args:{ body: interactionResponse } | { files?: RawFile[], body: { type: InteractionResponseType.ChannelMessageWithSource; data: MessageInteractionOptions; } }, data: postOptions['interactionCallback'] };
    applicationCommands: { return: interactionResult, args: RESTPostAPIApplicationCommandsJSONBody , data: postOptions['applicationCommands'] }
};