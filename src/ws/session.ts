import { WebSocketManager, WorkerShardingStrategy } from "@discordjs/ws";
import { Client, } from "../core";
import { REST } from "@discordjs/rest";
import { ChannelType, ComponentType, GatewayDispatchEvents, GatewayDispatchPayload, GatewayIntentBits, GatewayReadyDispatchData, GatewaySendPayload, InteractionType } from "discord-api-types/v10";
import { Guild, GuildMember, Interaction, Message, Ready, User, GuildEmojis} from "../types";
import { Presence } from "../types/events/Presence";
import { InteractionModal } from "../types/interaction/modal";
import { InteractionCommands } from "../types/interaction/commnads";
import { InteractionButton, InteractionSelectAny } from "../types/interaction/componets";
import { channelConvertidor } from "../utils";


export class HennusWS extends WebSocketManager {

    private client: Client;

    constructor(client: Client, rest: REST) {

        super({
            token: client.token,
            intents: client.intents.bitfield,
            rest,
            buildStrategy: (manager) => new WorkerShardingStrategy(manager, { shardsPerWorker: "all" }),
            shardCount: client.options.sharCount,
            shardIds: client.options.shardIds,
        });

        Object.defineProperty(this, "client", {
            value: client,
        });
    };


    async Handler(data: GatewayDispatchPayload) {
        if (data.t == GatewayDispatchEvents.GuildCreate) {
            //Cargando todo.
            const guild = new Guild(data.d, this.client);
            guild.memberCount = data.d.member_count;
            guild.roles.setall(data.d.roles);
            const channels: any = [...data.d.channels, ...data.d.threads].map((channel) => {return channelConvertidor(channel, this.client)}).filter((x) => x !== undefined);
            this.client.channels.setall(channels);
            guild.members.setall(data.d.members, guild);
            this.client.emojis.setall(data.d.emojis.map((x)=> new GuildEmojis(x, guild, this.client)));
            const cache = this.client.guilds.cache.get(guild.id);
            if (!cache) this.client.guilds.cache.set(guild.id, guild);

            this.client.emit("GuildCreate", guild);
        } else if (data.t == GatewayDispatchEvents.GuildUpdate) {
            const cache = this.client.guilds.cache.get(data.d.id);
            if (cache) {
                this.client.guilds.cache.delete(cache.id);
                //@ts-ignore
                cache.data = data.d;
                if (data.d.approximate_member_count && cache.memberCount != data.d.approximate_member_count) cache.memberCount = data.d.approximate_member_count;
                if (data.d.description !== cache.description) cache.description = data.d.description ?? undefined;
                if (data.d.name != cache.name) cache.name = data.d.name;
                this.client.emit("GuildUpdate", cache);
                this.client.guilds.cache.set(data.d.id, cache);
            };
        } else if (data.t == GatewayDispatchEvents.GuildDelete) {
            const cache = this.client.guilds.cache.get(data.d.id);
            if (cache) {
                this.client.emit("GuildDelete", cache);
                this.client.guilds.cache.delete(cache.id);
            };
        } else if (data.t == GatewayDispatchEvents.ChannelCreate || data.t == GatewayDispatchEvents.ChannelUpdate || data.t == GatewayDispatchEvents.ChannelDelete) {
            let channel = channelConvertidor(data.d, this.client);

            if (channel) {
                const cache = this.client.channels.cache.get(channel.id);
                if (data.t == GatewayDispatchEvents.ChannelCreate) {
                    !channel.isChannelCategory()? channel.messages : undefined;
                    this.client.channels.cache.set(channel.id, channel);
                    this.client.emit('ChannelCreate', channel);
                };
                if (data.t == GatewayDispatchEvents.ChannelDelete) {
                    this.client.emit('ChannelDelete', channel);
                    if (cache) this.client.channels.cache.delete(channel.id);
                };
                if (data.t == GatewayDispatchEvents.ChannelUpdate) {

                    if (!cache){ !channel.isChannelCategory()? channel.messages : undefined; this.client.channels.cache.set(channel.id, channel); }
                    else {
                        //@ts-ignore
                        cache.data = channel.data;
                        //@ts-ignore
                        cache._data = channel._data;
                        cache.name = channel.name;
                        this.client.channels.update(cache);
                    };

                    this.client.emit('ChannelUpdate', channel);
                };
            };
        } else if (data.t == GatewayDispatchEvents.MessageCreate) {
            const message = new Message(data.d, this.client);
            this.client.emit("MessageCreate", message);

            const channel = message.channel;

            if (channel && !channel.isChannelCategory()) {
                channel.lastMessage = message.id;

                channel.messages.cache.set(message.id, message);

                this.client.channels.update(channel);
            };
        } else if (data.t == GatewayDispatchEvents.MessageDelete) {
            const channel = this.client.channels.cache.get(data.d.channel_id);
            let msg: Message | undefined;
            if (channel && !channel.isChannelCategory()) msg = channel.messages.cache.get(data.d.id);
            if (msg) {
                this.client.emit("MessageDelete", msg);
                if (channel && !channel.isChannelCategory()) channel.messages.cache.delete(data.d.id);
            };
        } else if (data.t == GatewayDispatchEvents.MessageUpdate) {
            const New_msg = new Message(data.d, this.client);
            const channel = this.client.channels.cache.get(data.d.channel_id);
            let Old_msg: Message | undefined;
            if (channel && !channel.isChannelCategory()) Old_msg = channel.messages.cache.get(data.d.id);
            this.client.emit("MessageUpdate", New_msg, Old_msg);
            if (channel && !channel.isChannelCategory()) {
                channel.messages.update(New_msg);
            };
        } else if (data.t == GatewayDispatchEvents.PresenceUpdate) {
            const presence = new Presence(data.d, this.client);

            this.client.emit("PresenceUpdate", presence);
            if (!this.client.users.cache.has(presence.user.id)) this.client.users.cache.set(presence.user.id, presence.user);
        } else if (data.t == GatewayDispatchEvents.UserUpdate) {
            const user = new User(data.d, this.client);

            this.client.users.update(user);
            this.client.emit("UserUpdate", user);
        } else if (data.t == GatewayDispatchEvents.GuildMemberAdd) {
            const guild = this.client.guilds.resolve(data.d.guild_id);
            let member: GuildMember | undefined = undefined;

            if (guild) {
                if (data.d.user && !guild.members.resolve(data.d.user?.id ?? "")) {
                    guild.memberCount = guild.memberCount + 1;
                    member = new GuildMember(data.d, guild, this.client);
                    guild.members.cache.set(data.d.user.id, member);
                    this.client.guilds.add(guild);
                } else member = new GuildMember(data.d, guild, this.client);
            };
            if (member) {
                this.client.emit("GuildMemberAdd", member);
            };
        } else if (data.t == GatewayDispatchEvents.GuildMemberRemove) {
            const id = data.d.user.id;
            const guildId = data.d.guild_id;
            const guild = this.client.guilds.resolve(guildId);
            if (guild) {
                const member = guild.members.resolve(id);
                if (member) {
                    this.client.emit("GuildMemberRemove", member);
                    guild.memberCount = guild.memberCount - 1;
                    guild.members.cache.delete(id);
                    this.client.guilds.add(guild)
                };
            };
        } else if (data.t == GatewayDispatchEvents.GuildMemberUpdate) {
            const id = data.d.user.id;
            const guildId = data.d.guild_id;
            const guild = this.client.guilds.resolve(guildId);
            if (guild) {
                const oldMember = guild.members.resolve(id);
                const newMember = new GuildMember(data.d as any, guild, this.client);
                this.client.emit("GuildMemberUpdate", newMember, oldMember);
                guild.members.add(newMember);
                this.client.guilds.add(guild);
            };
        } else if (data.t == GatewayDispatchEvents.GuildMembersChunk) {
            const guildId = data.d.guild_id;
            const guild = this.client.guilds.resolve(guildId);
            if (guild) {
                const count = data.d.chunk_count;
                guild.memberCount = guild.memberCount + count;
                const members = data.d.members.map((member => new GuildMember(member, guild, this.client)));
                this.client.emit("GuildMembersChunk", members);
                members.forEach((member) => {
                    guild.members.add(member);
                });
            };

            if (this.client.intents.has(GatewayIntentBits.GuildMembers) && data.d.presences) data.d.presences.forEach((presence) => {
                const user = new User(presence.user as any, this.client);
                this.client.users.update(user);
            });
        } else if (data.t == GatewayDispatchEvents.InteractionCreate){
            let int: Interaction | undefined = undefined;
            if(data.d.type  == InteractionType.ModalSubmit) int = new InteractionModal(data.d, this.client);
            if(data.d.type == InteractionType.ApplicationCommand || data.d.type == InteractionType.ApplicationCommandAutocomplete) int = new InteractionCommands(data.d, this.client);
            if(data.d.type == InteractionType.MessageComponent) {
                if(data.d.data.component_type == ComponentType.Button) int = new InteractionButton(data.d, this.client);
                else int = new InteractionSelectAny(data.d, this.client);
            };

            if(int) this.client.emit("InteractionCreate", int);
        };
    };

    async ready(data: GatewayReadyDispatchData) {
        const ready = new Ready(data, this.client);

        this.client.emit("Ready", ready);

        if (!this.client.intents.has(GatewayIntentBits.Guilds)) {

            for (let index = 0; index < data.guilds.length; index++) {
                if (index > 5) continue;
                const element = data.guilds[index];
                const channels = await this.client.rest.get("guildChannels", element.id);
                let guild;

                if (element.unavailable) guild = await this.client.rest.get("guild", element.id);
                if (channels) {
                    this.client.channels.setall(channels);
                };
                if (guild) {
                    guild.members.fetchall();
                    guild.roles.fetchall(guild.id);
                    this.client.guilds.cache.set(guild.id, guild)
                };

            };
        };
    };

    async sendall(packet: GatewaySendPayload){
        for (const shardId of await this.getShardIds()) this.send(shardId, packet);
    };
};