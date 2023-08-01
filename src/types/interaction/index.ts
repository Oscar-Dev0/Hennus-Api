import { APICommandAutocompleteInteractionResponseCallbackData, InteractionResponseType, RESTPostAPIApplicationCommandsResult, APIApplicationCommand, ApplicationCommandType } from "discord-api-types/v10";
import { MessageInteractionOptions } from "../message";
import { ModalBuilder } from "../../build";
import { Permissions } from "../base/permissions";
import { AddUndefinedToPossiblyUndefinedPropertiesOfInterface } from "discord-api-types/utils/internals"
import { InteractionCommands } from "./commnads";
import { InteractionModal } from "./modal";
import { ComponentsInteraction, InteractionButton, InteractionSelectAny } from "./componets";




export { ComponentsInteraction, InteractionButton, InteractionSelectAny, InteractionCommands, InteractionModal };


type interactionBase = AddUndefinedToPossiblyUndefinedPropertiesOfInterface<Omit<APIApplicationCommand, 'id' | 'application_id' | 'description' | 'type' | 'version' | 'guild_id' | 'name_localized' | 'description_localized' | 'default_member_permissions'> & Partial<Pick<{ default_member_permissions?: Permissions  |Permissions[] }, "default_member_permissions">>>;

interface ChatInputApplicationCommands extends interactionBase  {
    type?: ApplicationCommandType.ChatInput | undefined;
    description: string;
};

interface ContextMenuApplicationCommands extends interactionBase {
    type: ApplicationCommandType.User | ApplicationCommandType.Message;
};

export type ApplicationCommandData = ChatInputApplicationCommands | ContextMenuApplicationCommands;












export type interactionResponse = 
{ type: InteractionResponseType.Pong } |
{ type: InteractionResponseType.ChannelMessageWithSource, data: MessageInteractionOptions } |
{ type: InteractionResponseType.DeferredChannelMessageWithSource, data?: Pick<MessageInteractionOptions, "flags"> } |
{ type: InteractionResponseType.DeferredMessageUpdate } |
{ type: InteractionResponseType.UpdateMessage , data?: MessageInteractionOptions } |
{ type: InteractionResponseType.ApplicationCommandAutocompleteResult, data: APICommandAutocompleteInteractionResponseCallbackData } |
{ type: InteractionResponseType.Modal, data: ModalBuilder };

export type interactionResult = RESTPostAPIApplicationCommandsResult;

export type Interaction = InteractionCommands | InteractionModal | ComponentsInteraction;