export type snowflake = string;
export type integer = number;
export interface config {
    id: snowflake;
    token: string;
}
export declare const Routes: {
    /**
     * @type Get
     * @returns /guilds/${guild.id}/audit-logs
     */
    guildAuditLog: (id: snowflake) => string;
    /**
    * @type Get - Patch - Delete
    * @rturns /channels/${channel.id}
    */
    channel: (id: snowflake) => string;
    /**
    * @type Get - Post
    * @returns /channels/${channel.id}/messages
    */
    channelMessages: (id: snowflake) => string;
    /**
     * @type Get - Patch - Delete
     * @returns /channels/${channel.id}/messages/${message.id}
     */
    channelMessage: (channelID: snowflake, messageID: snowflake) => string;
    /**
     * @type Post
     * @returns /channels/{channel.id}/messages/{message.id}/crosspost
     */
    channelMessageCrosspost: (channelID: snowflake, messageID: snowflake) => string;
    /**
     *
     * @type Put - Delete
     * @returns `/channels/${channel.id}/messages/${message.id}/reactions/${emoji}/@me`
     */
    channelMessageOwnReaction: (channelID: snowflake, messageID: snowflake, emoji: string) => string;
    /**
     * @type Delete
     * @returns /channels/{channel.id}/messages/{message.id}/reactions/{emoji}/{user.id}
     */
    channelMessageUserReaction: (channelID: snowflake, messageID: snowflake, emoji: string, userID: snowflake) => string;
    /**
     * @type Get - Delete
     * @returns /channels/{channel.id}/messages/{message.id}/reactions/{emoji}
     */
    channelMessageReaction: (channelID: snowflake, messageID: snowflake, emoji: string) => string;
    /**
     *
     * @type Delete
     * @returns /channels/{channel.id}/messages/{message.id}/reactions
     */
    channelMessageAllReactions: (channelID: snowflake, messageID: snowflake) => string;
    /**
     * @type Put - Delete
     * @returns /channels/{channel.id}/permissions/{overwrite.id}
     */
    channelPermission: (channelID: snowflake, overwriteID: snowflake) => string;
    /**
     * @type  Get - Post
     * @returns /channels/{channel.id}/invites
     */
    channelInvites: (id: snowflake) => string;
    /**
     * @type Post
     * @returns /channels/{channel.id}/messages/bulk-delete
     */
    channelBulkDelete: (id: snowflake) => string;
    /**
     * @type Post
     * @returns /channels/{channel.id}/followers
     */
    channelFollowers: (id: snowflake) => string;
    /**
     * @type Post
     * @returns /channels/{channel.id}/typing
     */
    channelTyping: (id: snowflake) => string;
    /**
     * @type Put
     * @returns /channels/{channel.id}/pins
     */
    channelPins: (id: snowflake) => string;
    /**
     * @type Put - Delete
     * @returns /channels/{channel.id}/pins/{message.id}
     */
    channelPin: (channelID: snowflake, messageID: snowflake) => string;
    /**
     * @type Put  - Delete
     * @retuns /channels/{channel.id}/recipients/{user.id}
     */
    channelRecipient: (channelID: snowflake, userID: snowflake) => string;
    /**
     * @type Get - Post
     * @returns /guilds/{guild.id}/emojis
     */
    guildEmojis: (id: snowflake) => string;
    /**
     * @type Get - Patch - Delete
     * @returns /guilds/{guild.id}/emojis/{emoji.id}
     */
    guildEmoji: (guildID: snowflake, emojiID: snowflake) => string;
    /**
     * @type Get
     * @returns /guilds
     */
    guilds: () => string;
    /**
    * @type Get - Patch - Delete
    * @returns "/guilds/{guild.id}"
    */
    guild: (guildID: string) => string;
    /**
     * @type Get
     * @returns /guilds/{guild.id}/preview
     */
    guildPreview: (id: snowflake) => string;
    /**
     * @type Get - Post - Patch
     * @returns /guilds/{guild.id}/channels
     */
    guildChannels: (id: snowflake) => string;
    /**
     * @type Get - Put - Patch - Delete
     * @returns /guilds/{guild.id}/members/{user.id}
     */
    guildMember: (guildID: snowflake, userID?: "@me" | snowflake) => string;
    /**
     * @type Get
     * @returns /guilds/{guild.id}/members
     */
    guildMembers: (id: snowflake) => string;
    /**
     * @type Get
     * @returns /guilds/{guild.id}/members/search
     */
    guildMembersSearch: (id: snowflake) => string;
    /**
     * @type Patch
     * @returns /guilds/{guild.id}/members/@me/nick
     */
    guildCurrentMemberNickname: (id: snowflake) => string;
    /**
     * @type Put - Delete
     * @returns /guilds/{guild.id}/members/{user.id}/roles/{role.id}
     */
    guildMemberRole: (guildID: snowflake, userID: snowflake, roleID: snowflake) => string;
    /**
     * @type Get
     * @returns /guilds/{guild.id}/bans
     */
    guildBans: (id: snowflake) => string;
    /**
     * @type Get - Put - Delete
     * @returns /guilds/{guild.id}/bans/{user.id}
     */
    guildBan: (guildID: snowflake, userID: snowflake) => string;
    /**
     * @type Get - Post - Patch
     * @returns /guilds/{guild.id}/roles
     */
    guildRoles: (id: snowflake) => string;
    /**
     * @type Patch - Delete
     * @returns /guilds/{guild.id}/roles/{role.id}
     */
    guildRole: (guildID: snowflake, roleID: snowflake) => string;
    /**
     * @type Get - Post
     * @returns /guilds/{guild.id}/prune
     */
    guildPrune: (id: snowflake) => string;
    /**
     * @type Get
     * @returns /guilds/{guild.id}/regions
     */
    guildVoiceRegions: (id: snowflake) => string;
    /**
     * @type Get
     * @returns /guilds/{guild.id}/invites
     */
    guildInvites: (id: snowflake) => string;
    /**
     * @type Get
     * @returns /guilds/{guild.id}/integrations
     */
    guildIntegrations: (id: snowflake) => string;
    /**
     *
     * @returns /guilds/{guild.id}/integrations/{integration.id}
     */
    guildIntegration: (guildID: snowflake, integrationID: snowflake) => string;
    /**
     * @type Post
     * @returns /channels/{channel.id}/threads - /channels/{channel.id}/messages/{message.id}/threads
     */
    threads: (channelID: snowflake, messageID?: snowflake) => string;
    /**
     * @type Get
     * @returns /guilds/{guild.id}/threads/active
     */
    guildActiveThreads: (id: snowflake) => string;
    /**
     * @type Get
     * @returns /channels/{channel.id}/threads/archived/( public | private )
     */
    channelThreads: (id: snowflake, archivedType: "public" | "private") => string;
    /**
     * @type Get
     * @returns /channels/{channel.id}/users/@me/threads/archived/prviate
     */
    channelJoinedArchivedThreads: (id: snowflake) => string;
    /**
     * @type Get - Put - Delete
     * @returns /channels/{thread.id}/thread-members - /channels/{thread.id}/thread-members/{( user.id | "@me" )}
     */
    threadMembers: (threadID: snowflake, userID: "@me" | snowflake) => string;
    /**
    * @type Get - Patch
    * @returns /users/@me - /users/{user.id}
    */
    user: (id: "@me" | snowflake) => string;
    /**
    * @type Get
    * @returns /users/@me/guilds
    */
    userGuilds: () => string;
    /**
    * @type Get
    * @returns /users/@me/guilds/{guild.id}/member
    */
    userGuildMember: (id: snowflake) => string;
    /**
    * @type Delete
    * @returns /users/@me/guilds/{guild.id}
    */
    userGuild: (id: snowflake) => string;
    /**
    * @type Post
    * @returns /users/@me/channels`
    */
    userChannels: () => string;
    /**
     * @type Get
     * @returns /users/@me/connections
     */
    userConnections: () => string;
    /**
    * @type Get - Post
    * @returns /channels/{channel.id}/webhooks
    */
    channelWebhooks: (id: snowflake) => string;
    /**
    * @type Get
    * @returns /guilds/{guild.id}/webhooks
    */
    guildWebhooks: (id: snowflake) => string;
    /**
    * @type Get - Post - Patch - Delete
    * @returns "/webhooks/${webhook.id}"
    * @returns "/webhooks/{webhook.id}/{webhook.token}"
    * @returns "/webhooks/{application.id}/{interaction.token}"
    */
    webhook: (id: snowflake, token?: string) => string;
    /**
     * @type Get - Post - Put - Patch - Delete
     * @returns `/applications/{application.id}/commands` - `/applications/{application.id}/commands/{command.id}`
     * @returns `/applications/{application.id}/guilds/{guild.id}/commands` - `/applications/{application.id}/guilds/{guild.id}/commands/{command.id}`
     */
    applicationCommands: (applicationID: snowflake, options?: {
        guildID: snowflake;
        CommandID: snowflake;
    }) => string;
    /**
     * @type Post
     * @returns /interactions/{interaction.id}/{interaction.token}/callback
     */
    interactionCallback: (id: snowflake, token: string) => string;
    /**
     * @type Patch
     * @returns /guilds/{guild.id}/voice-states/{( "@me" | user.id )}
     */
    guildVoiceState: (guildID: snowflake, userID: snowflake) => string;
    /**
     * @type Get - Put
     * @returns /applications/{application.id}/guilds/{guild.id}/commands/permissions
     */
    guildApplicationCommandsPermissions: (applicationID: snowflake, guildID: snowflake) => string;
    /**
     *
     * @returns /applications/{application.id}/guilds/{guild.id}/commands/{command.id}/permission
     */
    applicationCommandPermissions: (applicationID: snowflake, guildID: snowflake, commandID: snowflake) => string;
    /**
     * @type Post
     * @returns /stage-instances
     */
    stageInstances: () => string;
    /**
     * @type Get - Patch - Delete
     * @returns /stage-instances/{channel.id}
     */
    stageInstance: (id: snowflake) => string;
    /**
     * @tye Get
     * @returns /stickers/{sticker.id}
     */
    sticker: (id: snowflake) => string;
    /**
     * @type Get - Post
     * @returns /guilds/{guild.id}/stickers
     */
    guildStickers: (id: snowflake) => string;
    /**
     * @type Get - Patch - Delete
     * @returns /guilds/{guild.id}/stickers/{sticker.id}
     */
    guildSticker: (guildID: snowflake, stickerID: snowflake) => string;
    /**
     * @type Get - Post
     * @returns /guilds/{guild.id}/scheduled-events
     */
    guildScheduledEvents: (id: snowflake) => string;
    /**
     * @type Get - Patch - Delete
     * @returns /guilds/{guild.id}/scheduled-events/{guildScheduledEvent.id}
     */
    guildScheduledEvent: (guildID: snowflake, scheduledEventID: snowflake) => string;
    /**
     * @type Get
     * @returns /guilds/{guild.id}/scheduled-events/{guildScheduledEvent.id}/users
     */
    guildScheduledEventUsers: (guildID: snowflake, scheduledEventID: snowflake) => string;
};
export declare const RoutesCDN: {
    /**
     * formats: `PNG, JPEG, WebP, GIF`
     */
    customEmoji: (emojiID: snowflake, format: EmojiFormat) => string;
    /**
    * formats: `PNG, JPEG, WebP, GIF`
    */
    guildIcon: (id: snowflake, icon: string, format: GuildIconFormat) => string;
    /**
    * formats: `PNG, JPEG, WebP`
    */
    guildSplash: (id: snowflake, splash: string, format: GuildSplashFormat) => string;
    /**
     * formats: `PNG, JPEG, WebP`
     */
    guildDiscorySplash: (id: snowflake, discorySplash: string, format: GuildDiscoverySplashFormat) => string;
    /**
     * formats: `PNG, JPEG, WebP, GIF`
     */
    guildBanner: (id: snowflake, banner: string, format: GuildBannerFormat) => string;
    /**
     * formats: `PNG, JPEG, WebP, GIF`
     */
    userBanner: (id: snowflake, banner: string, format: UserBannerFormat) => string;
    /**
     * formats: `PNG, JPEG, WebP, GIF`
     */
    userAvatar: (id: snowflake, avatar: string, format: UserAvatarFormat) => string;
    /**
     * formats: `PNG, JPEG, WebP, GIF`
     */
    guildMemberAvatar: (guildId: snowflake, userId: snowflake, memberAvatar: string, format: GuildMemberAvatarFormat) => string;
    /**
     * formats: `PNG, JPEG, WebP`
     */
    applicationIcon: (id: snowflake, icon: string, format: ApplicationIconFormat) => string;
    /**
     * formats: `PNG, JPEG, WebP`
     */
    applicationCover: (id: snowflake, coverImage: string, format: ApplicationCoverFormat) => string;
    /**
     * formats: `PNG, JPEG, WebP`
     */
    applicationAsset: (id: snowflake, assetId: string, format: ApplicationAssetFormat) => string;
    /**
     * formats: `PNG, JPEG, WebP`
     */
    teamIcon: (id: snowflake, icon: string, format: TeamIconFormat) => string;
    /**
     * formats: `PNG, JSON`
     */
    sticker: (id: snowflake, format: StickerFormat) => string;
    /**
     * formats: `PNG, JPEG, WebP`
     */
    roleIcon: (id: snowflake, icon: string, format: RoleIconFormat) => string;
    /**
     * formats: `PNG, JPEG, WebP, GIF`
     */
    guildMemberBanner: (guildID: snowflake, userID: snowflake, banner: string, format: GuildMemberBannerFormat) => string;
};
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
export declare enum URLFomats {
    JPEG = "jpeg",
    PNG = "png",
    WebP = "webp",
    GIF = "gif",
    JSON = "json"
}
export declare const Routers: {
    api: string;
    cdn: string;
    invite: string;
    template: string;
    gift: string;
    scheduledEvent: string;
    gateway: string;
};
export declare const Version = "0.0.1-alpha";
export declare const authorizationURL: string;
export declare const tokenURL: string;
export type URLSize = "16" | "32" | "64" | "128" | "256" | "512" | "1024" | "2048" | "4096";
