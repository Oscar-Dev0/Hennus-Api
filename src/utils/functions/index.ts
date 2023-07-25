import { APIChannel, ChannelType } from "discord-api-types/v10";
import { BasedCategoryChannel, BasedDmChannel, BasedForumChannel, BasedTextChannel, BasedThreadChannel, BasedVoiceChannel, Channel } from "../../types";
import { Client } from "../../core";

export * from "./color"
export * from "./emojis";

export function channelConvertidor (ch: APIChannel, client: Client){
    let channel: Channel | undefined = undefined;

    if (ch.type == ChannelType.GuildText || ch.type == ChannelType.GuildAnnouncement) channel = new BasedTextChannel(ch, client);
    else if (ch.type == ChannelType.DM || ch.type == ChannelType.GroupDM) channel = new BasedDmChannel(ch, client);
    else if (ch.type == ChannelType.GuildVoice || ch.type == ChannelType.GuildStageVoice) channel = new BasedVoiceChannel(ch, client);
    else if (ch.type == ChannelType.GuildCategory) channel = new BasedCategoryChannel(ch, client);
    else if (ch.type == ChannelType.GuildForum) channel = new BasedForumChannel(ch, client);
    else if (ch.type == ChannelType.PublicThread || ch.type == ChannelType.PrivateThread || ch.type == ChannelType.AnnouncementThread) channel = new BasedThreadChannel(ch, client);
    return channel;
};