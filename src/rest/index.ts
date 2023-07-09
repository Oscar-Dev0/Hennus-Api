import { ChannelType } from "discord-api-types/v10";
import { Client } from "../core";
import { BasedCategoryChannel, BasedDmChannel, BasedForumChannel, BasedTextChannel, BasedThreadChannel, BasedVoiceChannel, Channel, Guild, Message } from "../types";
import { BaseRest } from "./base";
import { getNode, postNode } from "./types";

export class RestSession extends BaseRest {

    private client: Client;

    constructor(client: Client){
        super(client);
        this.client = client;
    };

    async post<a extends keyof postNode, ar extends postNode[a]['args'], d extends postNode[a]['data'], r extends postNode[a]['return']>(type: a, args: ar, ...data: d ):  Promise<r | undefined> {
        if(type == "channelMessages"){
            //@ts-ignore
            const msg = await super._post("channelMessages", { body: JSON.stringify(args) }, ...data);
            if(!msg) return undefined;
            return new Message(msg, this.client) as r;
        }

        return undefined;
    };

    async get<a extends keyof getNode, d extends getNode[a]['data'], r extends getNode[a]['return']>( type: a, ...data: d ): Promise<r | undefined> {
        if(type == "channelMessages"){
            //@ts-ignore
            const msgs = await super._get("channelMessages", {  }, ...data);
            if(!msgs || !Array.isArray(msgs)) return undefined;
            return msgs.map((msg)=>new Message(msg, this.client)) as r;
        } else if(type == "userGuilds"){
            // @ts-ignore
            const guilds = await super._get("userGuilds", {  }, ...data);
            if (!guilds || !Array.isArray(guilds)) return undefined;
            return guilds as r;
        } else if( type == "guild" ){
            const params = new URLSearchParams();
            params.append("with_counts", "true")
            //@ts-ignore
            const guild = await super._get("guild", { query: params }, ...data);
            if (typeof guild == 'object') return new Guild( guild, this.client ) as r ;
            return undefined;
        } else if( type == "guildChannels" ){
            //@ts-ignore
            const channels = await super._get("guildChannels", {}, ...data);
            if(channels && Array.isArray(channels)) return channels.map((x)=> { let channel: Channel | undefined = undefined; if(x.type == ChannelType.GuildText || x.type == ChannelType.GuildAnnouncement) channel = new BasedTextChannel(x, this.client);else if(x.type == ChannelType.DM || x.type == ChannelType.GroupDM) channel = new BasedDmChannel(x, this.client);else if(x.type == ChannelType.GuildVoice || x.type == ChannelType.GuildStageVoice) channel = new BasedVoiceChannel(x, this.client);else if(x.type == ChannelType.GuildCategory) channel = new BasedCategoryChannel(x, this.client);else if(x.type == ChannelType.GuildForum) channel = new BasedForumChannel(x, this.client);else if(x.type == ChannelType.PublicThread || x.type == ChannelType.PrivateThread || x.type == ChannelType.AnnouncementThread) channel = new BasedThreadChannel(x, this.client); if(channel) return channel; else return channel; }).filter((x)=> x!=undefined) as r;
            return undefined;
        };
        return undefined;
    };
};


export * from "./base";
export * from "./types";
export * from "./types";