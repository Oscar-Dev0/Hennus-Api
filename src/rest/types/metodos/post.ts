import { APIMessage, Routes } from "discord-api-types/v10";
import { Message, MessageCreateOptions } from "../../../types";
import { RawFile } from "@discordjs/rest";

export interface postReturn {
    channelMessages: APIMessage;
};

export interface postOptions {
    channelMessages: [ channelId: string ];
};

interface postLink {
    channelMessages: `/channels/${string}/messages`;
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
    channelMessages: { return: Message, args: MessageCreateOptions | { files: RawFile[], body?: MessageCreateOptions }, data: postOptions["channelMessages"]};
};