import { ChannelType, APIOverwrite, ChannelFlags } from "discord-api-types/v10";
import { BasedCategoryChannel } from "./categoryChannel";
import { BasedDmChannel } from "./dmChannel";
import { BasedForumChannel } from "./forumChannel";
import { BasedTextChannel } from "./textChannel";
import { BasedThreadChannel } from "./threadchannel";
import { BasedVoiceChannel } from "./voiceChannel";
import { Permissions } from "../base/permissions";

export { BasedDmChannel, BasedTextChannel, BasedVoiceChannel, BasedCategoryChannel, BasedForumChannel, BasedThreadChannel };

export type Channel = BasedTextChannel | BasedDmChannel | BasedVoiceChannel | BasedCategoryChannel | BasedForumChannel | BasedThreadChannel;

export interface UpdateTextAnnouncementChannel {
  name?: string;
  type?: ChannelType.GuildNews;
  position?: number;
  topic?: string;
  nsfw?: boolean;
  rate_limit_per_user?: number;
  permission_overwrites?: Overwrite[];
  parent_id?: string;
  rtc_region?: string;
  default_auto_archive_duration?: number;
};


export interface UpdateVoiceStageChannel {
  name?: string;
  position?: number;
  permission_overwrites?: Overwrite[];
  bitrate?: number;
  user_limit?: number;
  parent_id?: string;
  rtc_region?: string;
  video_quality_mode?: number;
};


export interface UpdateForumChannel {
  name?: string;
  position?: number;
  permission_overwrites?: Overwrite[];
  topic?: string;
  nsfw?: boolean;
  rate_limit_per_user?: number;
  flags?: number;
  available_tags?: Tag[];
  default_reaction_emoji?: Pick<Tag, "emoji_id"| "emoji_name"> | null;
  default_thread_rate_limit_per_user?: number;
  default_sort_order?: number;
  default_forum_layout?: number;
};


interface Tag {
  id: string; 
  name: string; 
  moderated: boolean; 
  emoji_id?: string; 
  emoji_name?: string; 
};

export interface UpdateThreadChannel {
  name?: string; 
  topic?: string;
  archived?: boolean;
  auto_archive_duration?: 60 | 1440 | 4320 | 10080;
  locked?: boolean;
  invitable?: boolean; 
  rate_limit_per_user?: number; 
  flags?: ChannelFlags.Pinned;
  applied_tags?: string[]; 
};

export interface UpdateDMGrupChannel {
  name?: string;
  /** icono codificado en base64 */
  icon?: string;
};

export type UpdateChannel = UpdateDMGrupChannel | UpdateForumChannel | UpdateTextAnnouncementChannel | UpdateThreadChannel | UpdateVoiceStageChannel;


export type Overwrite = Omit<APIOverwrite, "allow" | "deny"> & { deny?: Permissions, allow?: Permissions };
