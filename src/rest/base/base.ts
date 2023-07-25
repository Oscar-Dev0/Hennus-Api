import { APIMessage, ChannelType } from "discord-api-types/v10";
import { Client } from "../../core";
import { BasedCategoryChannel, BasedDmChannel, BasedForumChannel, BasedTextChannel, BasedThreadChannel, BasedVoiceChannel, Channel, Guild, GuildMember, GuildRoles, Message, User } from "../../types";
import { BaseRestFunction } from "./";
import { getNode, postNode } from "../types";

export class baseRest extends BaseRestFunction {

    private client: Client;

    constructor(client: Client) {
        super(client);
        this.client = client;
    };

    async post<a extends keyof postNode, ar extends postNode[a]['args'], d extends postNode[a]['data'], r extends postNode[a]['return']>(type: a, args: ar, ...data: d): Promise<r | undefined> {
        if (type == "channelMessages") {
            let msg: undefined | APIMessage = undefined;
            //@ts-ignore
            if (args && args?.files && args.files[0]) msg = await super._post("channelMessages", { ...args, headers: { "Content-Type": "multipart/form-data" } }, ...data);
            //@ts-ignore
            else if (args && !args.files) msg = await super._post("channelMessages", { body: args, headers: { "Content-Type": "application/json" } }, ...data);
            if (msg instanceof Error) throw msg;
            if (msg) return new Message(msg, this.client) as r;
        } else if (type == "applicationCommands") {
            //@ts-ignore
            const cmd = await super._post("applicationCommands", { body: args }, ...data);
            if (cmd instanceof Error) throw cmd;
            if (cmd) return cmd as r;
        } else if (type == "interactionCallback") {
            let int: any | undefined = undefined;

            //@ts-ignore
            if (args && args?.files && args.files[0]) int = await super._post("interactionCallback", { auth: false, ...args }, ...data);
            //@ts-ignore
            if(args && !args?.files) int = await super._post("interactionCallback", { ...args }, ...data);
            if (int instanceof Error) throw int;
            if (int) return int as r;
        };

        return undefined;
    };

    async get<a extends keyof getNode, d extends getNode[a]['data'], r extends getNode[a]['return']>(type: a, ...data: d): Promise<r | undefined> {
        if (type == "channelMessages") {
            //@ts-ignore
            const msgs = await super._get("channelMessages", {}, ...data);
            if (msgs instanceof Error) throw msgs;
            if (!msgs || !Array.isArray(msgs)) return undefined;
            return msgs.map((msg) => new Message(msg, this.client)) as r;
        } else if (type == "userGuilds") {
            // @ts-ignore
            const guilds = await super._get("userGuilds", {}, ...data);
            if (guilds instanceof Error) throw guilds;
            if (!guilds || !Array.isArray(guilds)) return undefined;
            return guilds as r;
        } else if (type == "guild") {
            const params = new URLSearchParams();
            params.append("with_counts", "true")
            //@ts-ignore
            const guild = await super._get("guild", { query: params }, ...data);
            if (guild instanceof Error) throw guild;
            if (typeof guild == 'object') return new Guild(guild, this.client) as r;
        } else if (type == "guildChannels") {
            //@ts-ignore
            const channels = await super._get("guildChannels", {}, ...data);
            if (channels instanceof Error) throw channels;
            if (channels && Array.isArray(channels)) return channels.map((x) => { let channel: Channel | undefined = undefined; if (x.type == ChannelType.GuildText || x.type == ChannelType.GuildAnnouncement) channel = new BasedTextChannel(x, this.client); else if (x.type == ChannelType.DM || x.type == ChannelType.GroupDM) channel = new BasedDmChannel(x, this.client); else if (x.type == ChannelType.GuildVoice || x.type == ChannelType.GuildStageVoice) channel = new BasedVoiceChannel(x, this.client); else if (x.type == ChannelType.GuildCategory) channel = new BasedCategoryChannel(x, this.client); else if (x.type == ChannelType.GuildForum) channel = new BasedForumChannel(x, this.client); else if (x.type == ChannelType.PublicThread || x.type == ChannelType.PrivateThread || x.type == ChannelType.AnnouncementThread) channel = new BasedThreadChannel(x, this.client); if (channel) return channel; else return channel; }).filter((x) => x != undefined) as r;
        } else if (type == "user") {
            //@ts-ignore
            const user = await super._get("user", {}, ...data);
            if (user instanceof Error) throw user;
            if (user) return new User(user, this.client) as r;
        } else if (type == "channelMessage") {
            const params = new URLSearchParams();
            params.append("limit", "100")
            //@ts-ignore
            const message = await super._get("channelMessage", { query: params }, ...data);
            if (message instanceof Error) throw message;
            if (message) return new Message(message, this.client) as r;
        } else if (type == "guildRoles") {
            //@ts-ignore
            const roles = await super._get("guildRoles", {}, ...data);
            if (roles instanceof Error) throw roles;
            if (roles) return roles.map((role) => new GuildRoles(role, this.client)) as r;
            return roles;
        } else if (type == "guildMember") {
            //@ts-ignore
            const member = await super._get("guildMember", {}, ...data);
            if (member instanceof Error) throw member;
            //@ts-ignore
            const guild = this.client.guilds.revolve(data[0])
            if (member && guild) return new GuildMember(member, guild, this.client) as r;
            if (member && !guild) return new GuildMember(member, { id: data[0] } as Guild, this.client) as r;
            return undefined;
        } else if (type == 'guildMembers') {
            const params = new URLSearchParams();
            params.append("limit", "1000")
            //@ts-ignore
            const members = await super._get("guildMembers", { query: params }, ...data);
            if (members instanceof Error) throw members;
            //@ts-ignore
            const guild = this.client.guilds.revolve(data[0])
            if (members && guild) return members.map((member) => new GuildMember(member, guild, this.client)) as r;
            if (members && !guild) return members.map((member) => new GuildMember(member, { id: data[0] } as Guild, this.client)) as r;
            return undefined;
        };
        return undefined;
    };

};


