import { BasedCategoryChannel } from "./categoryChannel";
import { BasedDmChannel } from "./dmChannel";
import { BasedForumChannel } from "./forumChannel";
import { BasedTextChannel } from "./textChannel";
import { BasedThreadChannel } from "./threadchannel";
import { BasedVoiceChannel } from "./voiceChannel";

export { BasedDmChannel, BasedTextChannel, BasedVoiceChannel, BasedCategoryChannel, BasedForumChannel, BasedThreadChannel };

export type Channel = BasedTextChannel | BasedDmChannel | BasedVoiceChannel | BasedCategoryChannel | BasedForumChannel | BasedThreadChannel;