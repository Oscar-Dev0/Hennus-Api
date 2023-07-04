export type snowflake = string;
export type integer = number;

export interface config {
    id: snowflake;
    token: string;
};


export const Routes = {

    /**
     * @type Get
     * @returns /guilds/${guild.id}/audit-logs
     */
    guildAuditLog : (id: snowflake) => `/guilds/${id}/audit-logs`,

    /**
    * @type Get - Patch - Delete
    * @rturns /channels/${channel.id}
    */    
    channel : (id: snowflake) => `/channels/${id}`,

    /** 
    * @type Get - Post
    * @returns /channels/${channel.id}/messages
    */
    channelMessages : (id: snowflake) => `/channels/${id}/messages`,

    /** 
     * @type Get - Patch - Delete
     * @returns /channels/${channel.id}/messages/${message.id}
     */
    channelMessage : (channelID: snowflake, messageID: snowflake) => `/channels/${channelID}/messages/${messageID}`,

    /**
     * @type Post
     * @returns /channels/{channel.id}/messages/{message.id}/crosspost
     */
    channelMessageCrosspost : (channelID: snowflake, messageID: snowflake) => `/channels/${channelID}/messages/${messageID}/crosspost`,
       
    /**
     * 
     * @type Put - Delete 
     * @returns `/channels/${channel.id}/messages/${message.id}/reactions/${emoji}/@me`
     */
    channelMessageOwnReaction : (channelID: snowflake, messageID: snowflake, emoji: string) => `/channels/${channelID}/messages/${messageID}/reactions/${emoji}/@me`,

    /**
     * @type Delete
     * @returns /channels/{channel.id}/messages/{message.id}/reactions/{emoji}/{user.id}
     */
    channelMessageUserReaction : (channelID: snowflake, messageID: snowflake, emoji: string, userID: snowflake) => `/channels/${channelID}/messages/${messageID}/reactions/${emoji}/${userID}`,

    /**
     * @type Get - Delete
     * @returns /channels/{channel.id}/messages/{message.id}/reactions/{emoji}
     */
    channelMessageReaction : (channelID: snowflake, messageID: snowflake, emoji: string) => `/channels/${channelID}/messages/${messageID}/reactions/${emoji}`,

    /**
     * 
     * @type Delete
     * @returns /channels/{channel.id}/messages/{message.id}/reactions
     */
    channelMessageAllReactions : (channelID: snowflake, messageID: snowflake) => `/channels/${channelID}/messages/${messageID}/reactions`,

    /**
     * @type Put - Delete
     * @returns /channels/{channel.id}/permissions/{overwrite.id}
     */
    channelPermission : (channelID: snowflake, overwriteID: snowflake) => `/channels/${channelID}/permissions/${overwriteID}`,

    /**
     * @type  Get - Post
     * @returns /channels/{channel.id}/invites
     */
    channelInvites : (id: snowflake) => `/channels/${id}/invites`,

    /**
     * @type Post
     * @returns /channels/{channel.id}/messages/bulk-delete
     */
    channelBulkDelete : (id: snowflake) => `/channels/${id}/messages/bulk-delete`, 

    /**
     * @type Post
     * @returns /channels/{channel.id}/followers
     */
    channelFollowers : (id: snowflake) => `/channels/${id}/followers`,

    /**
     * @type Post
     * @returns /channels/{channel.id}/typing
     */
    channelTyping : (id: snowflake) => `/channels/${id}/typing`,
    
    /**
     * @type Put
     * @returns /channels/{channel.id}/pins
     */
    channelPins : (id: snowflake) => `/channels/${id}/pins`,

    /**
     * @type Put - Delete
     * @returns /channels/{channel.id}/pins/{message.id}
     */
    channelPin : (channelID: snowflake, messageID: snowflake) => `/channels/${channelID}/pins/${messageID}`,

    /**
     * @type Put  - Delete
     * @retuns /channels/{channel.id}/recipients/{user.id}
     */
    channelRecipient: (channelID: snowflake, userID: snowflake) => `/channels/${channelID}/recipients/${userID}`,

    /**
     * @type Get - Post
     * @returns /guilds/{guild.id}/emojis
     */
    guildEmojis: (id: snowflake) => `/guilds/${id}/emojis`,

    /**
     * @type Get - Patch - Delete
     * @returns /guilds/{guild.id}/emojis/{emoji.id}
     */
    guildEmoji: (guildID: snowflake, emojiID: snowflake) => `/guilds/${guildID}/emojis/${emojiID}`,

    /**
     * @type Get
     * @returns /guilds
     */
    guilds: () => `/guilds`,

    /**
    * @type Get - Patch - Delete
    * @returns "/guilds/{guild.id}"
    */
    guild : (guildID: string) => `/guilds/${guildID}`,

    /**
     * @type Get
     * @returns /guilds/{guild.id}/preview
     */
    guildPreview: (id: snowflake) => `/guilds/${id}/preview`,

    /**
     * @type Get - Post - Patch
     * @returns /guilds/{guild.id}/channels
     */
    guildChannels: (id: snowflake) => `/guilds/${id}/channels`,

    /**
     * @type Get - Put - Patch - Delete
     * @returns /guilds/{guild.id}/members/{user.id}
     */
    guildMember: (guildID: snowflake, userID?: "@me" | snowflake) => {
        const _ = ( id: snowflake ) => `/guilds/${guildID}/members/${id}`;
        if(userID) return _(userID);
        return _("@me");
    },

    /**
     * @type Get
     * @returns /guilds/{guild.id}/members
     */
    guildMembers: (id: snowflake) => `/guilds/${id}/members`,

    /**
     * @type Get
     * @returns /guilds/{guild.id}/members/search
     */
    guildMembersSearch: (id: snowflake) => `/guilds/${id}/members/search`,

    /**
     * @type Patch
     * @returns /guilds/{guild.id}/members/@me/nick
     */
    guildCurrentMemberNickname: (id: snowflake) => `/guilds/${id}/members/@me/nick`,

    /**
     * @type Put - Delete
     * @returns /guilds/{guild.id}/members/{user.id}/roles/{role.id}
     */
    guildMemberRole: (guildID: snowflake, userID: snowflake, roleID: snowflake) => `/guilds/${guildID}/members/${userID}/roles/${roleID}`,

    /**
     * @type Get
     * @returns /guilds/{guild.id}/bans
     */
    guildBans: (id: snowflake) => `/guilds/${id}/bans`,

    /**
     * @type Get - Put - Delete
     * @returns /guilds/{guild.id}/bans/{user.id}
     */
    guildBan: (guildID: snowflake, userID: snowflake) => `/guilds/${guildID}/bans/${userID}`,

    /**
     * @type Get - Post - Patch
     * @returns /guilds/{guild.id}/roles
     */
    guildRoles: (id: snowflake) => `/guilds/${id}/roles`,

    /**
     * @type Patch - Delete
     * @returns /guilds/{guild.id}/roles/{role.id}
     */
    guildRole: (guildID: snowflake, roleID: snowflake) => `/guilds/${guildID}/roles/${roleID}`,

    /**
     * @type Get - Post
     * @returns /guilds/{guild.id}/prune
     */
    guildPrune: (id: snowflake) => `/guilds/${id}/prune`,

    /**
     * @type Get
     * @returns /guilds/{guild.id}/regions
     */
    guildVoiceRegions: (id: snowflake) => `/guilds/${id}/regions`,

    /**
     * @type Get
     * @returns /guilds/{guild.id}/invites
     */
    guildInvites: (id: snowflake) => `/guilds/${id}/invites`,

    /**
     * @type Get
     * @returns /guilds/{guild.id}/integrations
     */
    guildIntegrations: (id: snowflake) => `/guilds/${id}/integrations`,

    /**
     * 
     * @returns /guilds/{guild.id}/integrations/{integration.id}
     */
    guildIntegration: (guildID: snowflake, integrationID: snowflake) => `/guilds/${guildID}/integrations/${integrationID}`,

    /**
     * @type Post
     * @returns /channels/{channel.id}/threads - /channels/{channel.id}/messages/{message.id}/threads
     */
    threads: ( channelID: snowflake, messageID?: snowflake) => {
        if(messageID) return `/channels/${channelID}/messages/${messageID}/threads`;
        return `/channels/${channelID}/threads`;
    },

    /**
     * @type Get
     * @returns /guilds/{guild.id}/threads/active
     */
    guildActiveThreads: (id: snowflake) => `/guilds/${id}/threads/active`,

    /**
     * @type Get
     * @returns /channels/{channel.id}/threads/archived/( public | private )
     */
    channelThreads: (id: snowflake, archivedType: "public" | "private") => `/channels/${id}/threads/archived/${archivedType}`,

    /**
     * @type Get
     * @returns /channels/{channel.id}/users/@me/threads/archived/prviate
     */
    channelJoinedArchivedThreads: (id: snowflake) => `/channels/${id}/users/@me/threads/archived/prviate`,

    /**
     * @type Get - Put - Delete
     * @returns /channels/{thread.id}/thread-members - /channels/{thread.id}/thread-members/{( user.id | "@me" )}
     */
    threadMembers: (threadID: snowflake, userID: "@me" | snowflake) => `/channels/${threadID}/thread-members/${userID}`,

    /**
    * @type Get - Patch
    * @returns /users/@me - /users/{user.id}
    */
    user : (id: "@me" | snowflake ) => `/users/${id}`,
   
    /**
    * @type Get
    * @returns /users/@me/guilds
    */
    userGuilds : () => `/users/@me/guilds`,
   
    /**
    * @type Get
    * @returns /users/@me/guilds/{guild.id}/member
    */
    userGuildMember : (id: snowflake) => `/users/@me/guilds/${id}/member`,
   
    /**
    * @type Delete
    * @returns /users/@me/guilds/{guild.id}
    */
    userGuild : (id: snowflake) => `/users/@me/guilds/${id}`,
   
    /**
    * @type Post
    * @returns /users/@me/channels`
    */
    userChannels : () => `/users/@me/channels`,

    /**
     * @type Get
     * @returns /users/@me/connections
     */
    userConnections: () => `/users/@me/connections`,
   
    /**
    * @type Get - Post
    * @returns /channels/{channel.id}/webhooks
    */
    channelWebhooks : (id: snowflake) => `/channels/${id}/webhooks`,
   
    /**
    * @type Get
    * @returns /guilds/{guild.id}/webhooks
    */
    guildWebhooks :(id: snowflake) => `/guilds/${id}/webhooks`,
       
    /**
    * @type Get - Post - Patch - Delete
    * @returns "/webhooks/${webhook.id}"
    * @returns "/webhooks/{webhook.id}/{webhook.token}"
    * @returns "/webhooks/{application.id}/{interaction.token}"
    */
    webhook : (id: snowflake, token?: string) => {
        if(!token) return `/webhooks/${id}`;
        return `/webhooks/${id}/${token}`;
    },

    /**
     * @type Get - Post - Put - Patch - Delete 
     * @returns `/applications/{application.id}/commands` - `/applications/{application.id}/commands/{command.id}`
     * @returns `/applications/{application.id}/guilds/{guild.id}/commands` - `/applications/{application.id}/guilds/{guild.id}/commands/{command.id}`
     */
    applicationCommands: (applicationID: snowflake, options?: { guildID: snowflake, CommandID: snowflake }) => {
        let command = options?.CommandID;
        let guild = options?.guildID;
        if(command) return `/applications/${applicationID}/commands/${command}`;
        if(guild){
            if(command) return `/applications/${applicationID}/guilds/${guild}/commands/${command}`
            return `/applications/${applicationID}/guilds/${guild}`;
        };
        return `/applications/${applicationID}/commands`;
    },

    /**
     * @type Post
     * @returns /interactions/{interaction.id}/{interaction.token}/callback
     */
    interactionCallback: (id: snowflake, token: string) => `/interactions/${id}/${token}/callback`,

    /**
     * @type Patch
     * @returns /guilds/{guild.id}/voice-states/{( "@me" | user.id )}
     */
    guildVoiceState: (guildID: snowflake, userID: snowflake) => `/guilds/${guildID}/voice-states/${userID}`,

    /**
     * @type Get - Put
     * @returns /applications/{application.id}/guilds/{guild.id}/commands/permissions
     */
    guildApplicationCommandsPermissions: (applicationID: snowflake, guildID: snowflake) => `/applications/${applicationID}/guilds/${guildID}/commands/permissions`,
   
    /**
     * 
     * @returns /applications/{application.id}/guilds/{guild.id}/commands/{command.id}/permission
     */
    applicationCommandPermissions: (applicationID: snowflake, guildID: snowflake, commandID: snowflake) => `/applications/${applicationID}/guilds/${guildID}/commands/${commandID}/permission`,

    /**
     * @type Post
     * @returns /stage-instances
     */
    stageInstances: () => `/stage-instances`,

    /**
     * @type Get - Patch - Delete 
     * @returns /stage-instances/{channel.id}
     */
    stageInstance: (id: snowflake) => `/stage-instances/${id}`,

    /**
     * @tye Get
     * @returns /stickers/{sticker.id}
     */
    sticker: (id: snowflake) => `/stickers/${id}`,

    /**
     * @type Get - Post
     * @returns /guilds/{guild.id}/stickers
     */
    guildStickers: (id: snowflake) => `/guilds/${id}/stickers`,

    /**
     * @type Get - Patch - Delete
     * @returns /guilds/{guild.id}/stickers/{sticker.id}
     */
    guildSticker: (guildID: snowflake, stickerID: snowflake) => `/guilds/${guildID}/stickers/${stickerID}`,

    /**
     * @type Get - Post
     * @returns /guilds/{guild.id}/scheduled-events
     */
    guildScheduledEvents: (id: snowflake) => `/guilds/${id}/scheduled-events`,

    /**
     * @type Get - Patch - Delete
     * @returns /guilds/{guild.id}/scheduled-events/{guildScheduledEvent.id}
     */
    guildScheduledEvent: (guildID: snowflake, scheduledEventID: snowflake) => `/guilds/${guildID}/scheduled-events/${scheduledEventID}`,

    /**
     * @type Get
     * @returns /guilds/{guild.id}/scheduled-events/{guildScheduledEvent.id}/users
     */
    guildScheduledEventUsers: (guildID: snowflake, scheduledEventID: snowflake) => `/guilds/${guildID}/scheduled-events/${scheduledEventID}/users`
};


export const RoutesCDN = {
    /**
     * formats: `PNG, JPEG, WebP, GIF`
     */
    customEmoji: (emojiID: snowflake, format: EmojiFormat) => `emojis/${emojiID}.${format}`,

    /**
    * formats: `PNG, JPEG, WebP, GIF`
    */
    guildIcon: (id: snowflake, icon: string, format: GuildIconFormat) => `icons/${id}/${icon}.${format}`,

    /**
    * formats: `PNG, JPEG, WebP`
    */
    guildSplash: (id: snowflake, splash: string, format: GuildSplashFormat) => `splashes/${id}/${splash}.${format}`,
    
    /**
     * formats: `PNG, JPEG, WebP`
     */
    guildDiscorySplash: (id: snowflake, discorySplash: string, format: GuildDiscoverySplashFormat) => `discovery-splashes/${id}/${discorySplash}.${format}`,

    /**
     * formats: `PNG, JPEG, WebP, GIF`
     */
    guildBanner: (id: snowflake, banner: string, format: GuildBannerFormat) => `banners/${id}/${banner}.${format}`,

    /**
     * formats: `PNG, JPEG, WebP, GIF`
     */
    userBanner: (id: snowflake, banner: string, format: UserBannerFormat) => `/banners/${id}/${banner}.${format}`,

    /**
     * formats: `PNG, JPEG, WebP, GIF`
     */
    userAvatar: (id: snowflake, avatar: string, format: UserAvatarFormat) => `/avatars/${id}/${avatar}.${format}`,
    
    /**
     * formats: `PNG, JPEG, WebP, GIF`
     */
    guildMemberAvatar: (guildId: snowflake, userId: snowflake, memberAvatar: string, format: GuildMemberAvatarFormat) => `/guilds/${guildId}/users/${userId}/${memberAvatar}.${format}`,

    /**
     * formats: `PNG, JPEG, WebP`
     */
    applicationIcon: (id: snowflake, icon: string, format: ApplicationIconFormat) => `/app-icons/${id}/${icon}.${format}`,
    
    /**
     * formats: `PNG, JPEG, WebP`
     */
    applicationCover: (id: snowflake, coverImage: string, format: ApplicationCoverFormat) => `/app-icons/${id}/${coverImage}.${format}`,

    /**
     * formats: `PNG, JPEG, WebP`
     */
    applicationAsset: (id: snowflake, assetId: string, format: ApplicationAssetFormat) => `/app-icons/${id}/${assetId}.${format}`,

    /**
     * formats: `PNG, JPEG, WebP`
     */
    teamIcon: (id: snowflake, icon: string, format: TeamIconFormat) => `team-icons/${id}/${icon}.${format}`,

    /**
     * formats: `PNG, JSON`
     */
    sticker: (id: snowflake, format: StickerFormat) => `/stickers/${id}.${format}`,

    /**
     * formats: `PNG, JPEG, WebP`
     */
    roleIcon: (id: snowflake, icon: string, format: RoleIconFormat) => `/role-icons/${id}/${icon}.${format}`,

    /**
     * formats: `PNG, JPEG, WebP, GIF`
     */
    guildMemberBanner: (guildID: snowflake, userID: snowflake, banner: string, format: GuildMemberBannerFormat) => `/guilds/${guildID}/users/${userID}/banners/${banner}.${format}`,

}

export type EmojiFormat = Exclude<URLFomats, URLFomats.JSON>;
export type GuildIconFormat = Exclude<URLFomats, URLFomats.JSON>;
export type GuildSplashFormat = Exclude<URLFomats, URLFomats.JSON | URLFomats.GIF>;
export type GuildDiscoverySplashFormat = Exclude<URLFomats, URLFomats.JSON | URLFomats.GIF>;
export type GuildBannerFormat = Exclude<URLFomats, URLFomats.JSON>;
export type UserBannerFormat = Exclude<URLFomats, URLFomats.JSON>;
export type UserAvatarFormat = Exclude<URLFomats, URLFomats.JSON>;
export type GuildMemberAvatarFormat = Exclude<URLFomats, URLFomats.JSON>;
export type ApplicationIconFormat = Exclude<URLFomats, URLFomats.JSON | URLFomats.GIF>;
export type ApplicationCoverFormat = Exclude<URLFomats, URLFomats.JSON | URLFomats.GIF>;
export type ApplicationAssetFormat = Exclude<URLFomats, URLFomats.JSON | URLFomats.GIF>;
export type TeamIconFormat = Exclude<URLFomats, URLFomats.JSON | URLFomats.GIF>;
export type StickerFormat = Extract<URLFomats, URLFomats.PNG | URLFomats.JSON>;
export type RoleIconFormat = Exclude<URLFomats, URLFomats.JSON | URLFomats.GIF>;
export type GuildMemberBannerFormat = Exclude<URLFomats, URLFomats.JSON>;

export enum URLFomats  { 
    JPEG = "jpeg",
    PNG = "png",
    WebP = "webp",
    GIF = "gif",
    JSON = "json"
};

const Vdiscord = 10;

export  const Routers = {
    api: "https://discord.com/api/v" + Vdiscord,
    cdn: "https://cdn.discordapp.com",
    invite: "https://discord.gg",
    template: "https://discord.new",
    gift: "https://discord.gift",
    scheduledEvent: "https://discord.com/events",
    gateway: `wss://gateway.discord.gg/?v=${Vdiscord}&encoding=json`
};
export const Version = "0.0.1-alpha";
export const authorizationURL = `https://discord.com/api/v${Vdiscord}/oauth2/authorize`;
export const tokenURL = `https://discord.com/api/v${Vdiscord}/oauth2/token`;
export type URLSize = "16" | "32" | "64" | "128" | "256" | "512" | "1024" | "2048" | "4096";

