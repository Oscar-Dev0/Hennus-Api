import { APIInteractionDataResolved, APIMessageChannelSelectInteractionData, APIMessageComponentInteraction, APIMessageMentionableSelectInteractionData, APIMessageRoleSelectInteractionData, APIMessageStringSelectInteractionData, APIMessageUserSelectInteractionData, APIUserInteractionDataResolved, ComponentType, Snowflake } from "discord-api-types/v10";
import { ComponentsInteractionBased } from "./base";
import { Client } from "../../../core";

export class InteractionSelectAny extends ComponentsInteractionBased {

    selectData: APIMessageStringSelectInteractionData |
        APIMessageUserSelectInteractionData |
        APIMessageRoleSelectInteractionData |
        APIMessageMentionableSelectInteractionData |
        APIMessageChannelSelectInteractionData;

    constructor(data: APIMessageComponentInteraction, client: Client) {
        super(data, client);
        if (data.data.component_type != ComponentType.Button) this.selectData = data.data;
    };

    public get values() { return this.selectData.values };

    get resolved() {
        return {
            user: (id: Snowflake) => this.resolve("user").users[id],
            member: (id: Snowflake) => (this.resolve("user").members ?? {})[id],
            channel: (id: Snowflake) => this.resolve("channel").channels[id],
            role: (id: Snowflake) => this.resolve("role").roles[id],
            mentionable: this.mentionable,
        };
    };

    private get mentionable() {
        const data = this.resolve("mentionable")

        return {
            user: (id: Snowflake) => (data.users ?? {})[id],
            member: (id: Snowflake) => (data.members ?? {})[id],
            role: (id: Snowflake) => (data.roles ?? {})[id],
        };
    };

    private resolve<T extends resolved['type']>(type: T): Extract<resolved, { type: T }>["return"] {
        if (type == "user" && this.selectData.component_type == ComponentType.UserSelect) return this.selectData.resolved as any;
        else if (type == "role" && this.selectData.component_type == ComponentType.RoleSelect) return this.selectData.resolved as any;
        else if (type == "channel" && this.selectData.component_type == ComponentType.ChannelSelect) return this.selectData.resolved as any;
        else if (type == "mentionable" && this.selectData.component_type == ComponentType.MentionableSelect) return this.selectData.resolved as any;
        else return { users: {}, roles: {}, members: {}, channels: {} };
    };
};



type resolved =
    { type: "user", return: APIUserInteractionDataResolved } |
    { type: "role", return: Required<Pick<APIInteractionDataResolved, 'roles'>> } |
    { type: "channel", return: Required<Pick<APIInteractionDataResolved, 'channels'>> } |
    { type: "mentionable", return: Pick<APIInteractionDataResolved, 'users' | 'members' | 'roles'> };