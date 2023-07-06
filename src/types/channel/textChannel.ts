import { APINewsChannel, APITextChannel,  } from "discord-api-types/v10";
import { BaseChannel } from "../base/channel";
import { Message, MessageCreateData, MessageCreateOptions } from "../message";
import { Client } from "../../core";
import { Collection } from "@discordjs/collection";

export class BasedTextChannel extends BaseChannel {
    
    private _client : Client;
    private _cache_messages: Collection<string, Message>;
    private _count_Message: number;

    constructor( data: APITextChannel | APINewsChannel, client: Client) {
        super(data);
        this._client = client;
    };

    send(options: MessageCreateData){
        const mData: MessageCreateOptions = {
            content: undefined,
            embeds: undefined,
            components: undefined,
            attachments: undefined,
        };
        if (typeof options ==='string') {
            mData.content = options;
        } else if(typeof options == "object"){
            if(!options.attachments){
                if(options.components && Array.isArray(options.components)) mData.components = options.components;
                if(options.embeds && Array.isArray(options.embeds))mData.embeds = options.embeds;
                if(options.content) mData.content = options.content;
            } else{
                console.log("Attachments not supported yet"); //TODO implement attachment support for text channels
            };
        };
        return this._client.rest.post("channelMessages", mData, this.id)
    };

    get messages(){
        if(!this._count_Message){
            this._client.rest.get("channelMessages", this.id).then((x)=>{
                if(!x) return;
                this._count_Message = x.length;
                x.forEach((msg)=>this._cache_messages.set(msg.id, msg));
            });
        };
        return this._cache_messages;
    };
};