"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.tokenURL = exports.authorizationURL = exports.Version = exports.Routers = exports.URLFomats = exports.RoutesCDN = exports.Routes = void 0;
;
exports.Routes = {
    /**
     * @type Get
     * @returns /guilds/${guild.id}/audit-logs
     */
    guildAuditLog: (id) => `/guilds/${id}/audit-logs`,
    /**
    * @type Get - Patch - Delete
    * @rturns /channels/${channel.id}
    */
    channel: (id) => `/channels/${id}`,
    /**
    * @type Get - Post
    * @returns /channels/${channel.id}/messages
    */
    channelMessages: (id) => `/channels/${id}/messages`,
    /**
     * @type Get - Patch - Delete
     * @returns /channels/${channel.id}/messages/${message.id}
     */
    channelMessage: (channelID, messageID) => `/channels/${channelID}/messages/${messageID}`,
    /**
     * @type Post
     * @returns /channels/{channel.id}/messages/{message.id}/crosspost
     */
    channelMessageCrosspost: (channelID, messageID) => `/channels/${channelID}/messages/${messageID}/crosspost`,
    /**
     *
     * @type Put - Delete
     * @returns `/channels/${channel.id}/messages/${message.id}/reactions/${emoji}/@me`
     */
    channelMessageOwnReaction: (channelID, messageID, emoji) => `/channels/${channelID}/messages/${messageID}/reactions/${emoji}/@me`,
    /**
     * @type Delete
     * @returns /channels/{channel.id}/messages/{message.id}/reactions/{emoji}/{user.id}
     */
    channelMessageUserReaction: (channelID, messageID, emoji, userID) => `/channels/${channelID}/messages/${messageID}/reactions/${emoji}/${userID}`,
    /**
     * @type Get - Delete
     * @returns /channels/{channel.id}/messages/{message.id}/reactions/{emoji}
     */
    channelMessageReaction: (channelID, messageID, emoji) => `/channels/${channelID}/messages/${messageID}/reactions/${emoji}`,
    /**
     *
     * @type Delete
     * @returns /channels/{channel.id}/messages/{message.id}/reactions
     */
    channelMessageAllReactions: (channelID, messageID) => `/channels/${channelID}/messages/${messageID}/reactions`,
    /**
     * @type Put - Delete
     * @returns /channels/{channel.id}/permissions/{overwrite.id}
     */
    channelPermission: (channelID, overwriteID) => `/channels/${channelID}/permissions/${overwriteID}`,
    /**
     * @type  Get - Post
     * @returns /channels/{channel.id}/invites
     */
    channelInvites: (id) => `/channels/${id}/invites`,
    /**
     * @type Post
     * @returns /channels/{channel.id}/messages/bulk-delete
     */
    channelBulkDelete: (id) => `/channels/${id}/messages/bulk-delete`,
    /**
     * @type Post
     * @returns /channels/{channel.id}/followers
     */
    channelFollowers: (id) => `/channels/${id}/followers`,
    /**
     * @type Post
     * @returns /channels/{channel.id}/typing
     */
    channelTyping: (id) => `/channels/${id}/typing`,
    /**
     * @type Put
     * @returns /channels/{channel.id}/pins
     */
    channelPins: (id) => `/channels/${id}/pins`,
    /**
     * @type Put - Delete
     * @returns /channels/{channel.id}/pins/{message.id}
     */
    channelPin: (channelID, messageID) => `/channels/${channelID}/pins/${messageID}`,
    /**
     * @type Put  - Delete
     * @retuns /channels/{channel.id}/recipients/{user.id}
     */
    channelRecipient: (channelID, userID) => `/channels/${channelID}/recipients/${userID}`,
    /**
     * @type Get - Post
     * @returns /guilds/{guild.id}/emojis
     */
    guildEmojis: (id) => `/guilds/${id}/emojis`,
    /**
     * @type Get - Patch - Delete
     * @returns /guilds/{guild.id}/emojis/{emoji.id}
     */
    guildEmoji: (guildID, emojiID) => `/guilds/${guildID}/emojis/${emojiID}`,
    /**
     * @type Get
     * @returns /guilds
     */
    guilds: () => `/guilds`,
    /**
    * @type Get - Patch - Delete
    * @returns "/guilds/{guild.id}"
    */
    guild: (guildID) => `/guilds/${guildID}`,
    /**
     * @type Get
     * @returns /guilds/{guild.id}/preview
     */
    guildPreview: (id) => `/guilds/${id}/preview`,
    /**
     * @type Get - Post - Patch
     * @returns /guilds/{guild.id}/channels
     */
    guildChannels: (id) => `/guilds/${id}/channels`,
    /**
     * @type Get - Put - Patch - Delete
     * @returns /guilds/{guild.id}/members/{user.id}
     */
    guildMember: (guildID, userID) => {
        const _ = (id) => `/guilds/${guildID}/members/${id}`;
        if (userID)
            return _(userID);
        return _("@me");
    },
    /**
     * @type Get
     * @returns /guilds/{guild.id}/members
     */
    guildMembers: (id) => `/guilds/${id}/members`,
    /**
     * @type Get
     * @returns /guilds/{guild.id}/members/search
     */
    guildMembersSearch: (id) => `/guilds/${id}/members/search`,
    /**
     * @type Patch
     * @returns /guilds/{guild.id}/members/@me/nick
     */
    guildCurrentMemberNickname: (id) => `/guilds/${id}/members/@me/nick`,
    /**
     * @type Put - Delete
     * @returns /guilds/{guild.id}/members/{user.id}/roles/{role.id}
     */
    guildMemberRole: (guildID, userID, roleID) => `/guilds/${guildID}/members/${userID}/roles/${roleID}`,
    /**
     * @type Get
     * @returns /guilds/{guild.id}/bans
     */
    guildBans: (id) => `/guilds/${id}/bans`,
    /**
     * @type Get - Put - Delete
     * @returns /guilds/{guild.id}/bans/{user.id}
     */
    guildBan: (guildID, userID) => `/guilds/${guildID}/bans/${userID}`,
    /**
     * @type Get - Post - Patch
     * @returns /guilds/{guild.id}/roles
     */
    guildRoles: (id) => `/guilds/${id}/roles`,
    /**
     * @type Patch - Delete
     * @returns /guilds/{guild.id}/roles/{role.id}
     */
    guildRole: (guildID, roleID) => `/guilds/${guildID}/roles/${roleID}`,
    /**
     * @type Get - Post
     * @returns /guilds/{guild.id}/prune
     */
    guildPrune: (id) => `/guilds/${id}/prune`,
    /**
     * @type Get
     * @returns /guilds/{guild.id}/regions
     */
    guildVoiceRegions: (id) => `/guilds/${id}/regions`,
    /**
     * @type Get
     * @returns /guilds/{guild.id}/invites
     */
    guildInvites: (id) => `/guilds/${id}/invites`,
    /**
     * @type Get
     * @returns /guilds/{guild.id}/integrations
     */
    guildIntegrations: (id) => `/guilds/${id}/integrations`,
    /**
     *
     * @returns /guilds/{guild.id}/integrations/{integration.id}
     */
    guildIntegration: (guildID, integrationID) => `/guilds/${guildID}/integrations/${integrationID}`,
    /**
     * @type Post
     * @returns /channels/{channel.id}/threads - /channels/{channel.id}/messages/{message.id}/threads
     */
    threads: (channelID, messageID) => {
        if (messageID)
            return `/channels/${channelID}/messages/${messageID}/threads`;
        return `/channels/${channelID}/threads`;
    },
    /**
     * @type Get
     * @returns /guilds/{guild.id}/threads/active
     */
    guildActiveThreads: (id) => `/guilds/${id}/threads/active`,
    /**
     * @type Get
     * @returns /channels/{channel.id}/threads/archived/( public | private )
     */
    channelThreads: (id, archivedType) => `/channels/${id}/threads/archived/${archivedType}`,
    /**
     * @type Get
     * @returns /channels/{channel.id}/users/@me/threads/archived/prviate
     */
    channelJoinedArchivedThreads: (id) => `/channels/${id}/users/@me/threads/archived/prviate`,
    /**
     * @type Get - Put - Delete
     * @returns /channels/{thread.id}/thread-members - /channels/{thread.id}/thread-members/{( user.id | "@me" )}
     */
    threadMembers: (threadID, userID) => `/channels/${threadID}/thread-members/${userID}`,
    /**
    * @type Get - Patch
    * @returns /users/@me - /users/{user.id}
    */
    user: (id) => `/users/${id}`,
    /**
    * @type Get
    * @returns /users/@me/guilds
    */
    userGuilds: () => `/users/@me/guilds`,
    /**
    * @type Get
    * @returns /users/@me/guilds/{guild.id}/member
    */
    userGuildMember: (id) => `/users/@me/guilds/${id}/member`,
    /**
    * @type Delete
    * @returns /users/@me/guilds/{guild.id}
    */
    userGuild: (id) => `/users/@me/guilds/${id}`,
    /**
    * @type Post
    * @returns /users/@me/channels`
    */
    userChannels: () => `/users/@me/channels`,
    /**
     * @type Get
     * @returns /users/@me/connections
     */
    userConnections: () => `/users/@me/connections`,
    /**
    * @type Get - Post
    * @returns /channels/{channel.id}/webhooks
    */
    channelWebhooks: (id) => `/channels/${id}/webhooks`,
    /**
    * @type Get
    * @returns /guilds/{guild.id}/webhooks
    */
    guildWebhooks: (id) => `/guilds/${id}/webhooks`,
    /**
    * @type Get - Post - Patch - Delete
    * @returns "/webhooks/${webhook.id}"
    * @returns "/webhooks/{webhook.id}/{webhook.token}"
    * @returns "/webhooks/{application.id}/{interaction.token}"
    */
    webhook: (id, token) => {
        if (!token)
            return `/webhooks/${id}`;
        return `/webhooks/${id}/${token}`;
    },
    /**
     * @type Get - Post - Put - Patch - Delete
     * @returns `/applications/{application.id}/commands` - `/applications/{application.id}/commands/{command.id}`
     * @returns `/applications/{application.id}/guilds/{guild.id}/commands` - `/applications/{application.id}/guilds/{guild.id}/commands/{command.id}`
     */
    applicationCommands: (applicationID, options) => {
        let command = options === null || options === void 0 ? void 0 : options.CommandID;
        let guild = options === null || options === void 0 ? void 0 : options.guildID;
        if (command)
            return `/applications/${applicationID}/commands/${command}`;
        if (guild) {
            if (command)
                return `/applications/${applicationID}/guilds/${guild}/commands/${command}`;
            return `/applications/${applicationID}/guilds/${guild}`;
        }
        ;
        return `/applications/${applicationID}/commands`;
    },
    /**
     * @type Post
     * @returns /interactions/{interaction.id}/{interaction.token}/callback
     */
    interactionCallback: (id, token) => `/interactions/${id}/${token}/callback`,
    /**
     * @type Patch
     * @returns /guilds/{guild.id}/voice-states/{( "@me" | user.id )}
     */
    guildVoiceState: (guildID, userID) => `/guilds/${guildID}/voice-states/${userID}`,
    /**
     * @type Get - Put
     * @returns /applications/{application.id}/guilds/{guild.id}/commands/permissions
     */
    guildApplicationCommandsPermissions: (applicationID, guildID) => `/applications/${applicationID}/guilds/${guildID}/commands/permissions`,
    /**
     *
     * @returns /applications/{application.id}/guilds/{guild.id}/commands/{command.id}/permission
     */
    applicationCommandPermissions: (applicationID, guildID, commandID) => `/applications/${applicationID}/guilds/${guildID}/commands/${commandID}/permission`,
    /**
     * @type Post
     * @returns /stage-instances
     */
    stageInstances: () => `/stage-instances`,
    /**
     * @type Get - Patch - Delete
     * @returns /stage-instances/{channel.id}
     */
    stageInstance: (id) => `/stage-instances/${id}`,
    /**
     * @tye Get
     * @returns /stickers/{sticker.id}
     */
    sticker: (id) => `/stickers/${id}`,
    /**
     * @type Get - Post
     * @returns /guilds/{guild.id}/stickers
     */
    guildStickers: (id) => `/guilds/${id}/stickers`,
    /**
     * @type Get - Patch - Delete
     * @returns /guilds/{guild.id}/stickers/{sticker.id}
     */
    guildSticker: (guildID, stickerID) => `/guilds/${guildID}/stickers/${stickerID}`,
    /**
     * @type Get - Post
     * @returns /guilds/{guild.id}/scheduled-events
     */
    guildScheduledEvents: (id) => `/guilds/${id}/scheduled-events`,
    /**
     * @type Get - Patch - Delete
     * @returns /guilds/{guild.id}/scheduled-events/{guildScheduledEvent.id}
     */
    guildScheduledEvent: (guildID, scheduledEventID) => `/guilds/${guildID}/scheduled-events/${scheduledEventID}`,
    /**
     * @type Get
     * @returns /guilds/{guild.id}/scheduled-events/{guildScheduledEvent.id}/users
     */
    guildScheduledEventUsers: (guildID, scheduledEventID) => `/guilds/${guildID}/scheduled-events/${scheduledEventID}/users`
};
exports.RoutesCDN = {
    /**
     * formats: `PNG, JPEG, WebP, GIF`
     */
    customEmoji: (emojiID, format) => `emojis/${emojiID}.${format}`,
    /**
    * formats: `PNG, JPEG, WebP, GIF`
    */
    guildIcon: (id, icon, format) => `icons/${id}/${icon}.${format}`,
    /**
    * formats: `PNG, JPEG, WebP`
    */
    guildSplash: (id, splash, format) => `splashes/${id}/${splash}.${format}`,
    /**
     * formats: `PNG, JPEG, WebP`
     */
    guildDiscorySplash: (id, discorySplash, format) => `discovery-splashes/${id}/${discorySplash}.${format}`,
    /**
     * formats: `PNG, JPEG, WebP, GIF`
     */
    guildBanner: (id, banner, format) => `banners/${id}/${banner}.${format}`,
    /**
     * formats: `PNG, JPEG, WebP, GIF`
     */
    userBanner: (id, banner, format) => `/banners/${id}/${banner}.${format}`,
    /**
     * formats: `PNG, JPEG, WebP, GIF`
     */
    userAvatar: (id, avatar, format) => `/avatars/${id}/${avatar}.${format}`,
    /**
     * formats: `PNG, JPEG, WebP, GIF`
     */
    guildMemberAvatar: (guildId, userId, memberAvatar, format) => `/guilds/${guildId}/users/${userId}/${memberAvatar}.${format}`,
    /**
     * formats: `PNG, JPEG, WebP`
     */
    applicationIcon: (id, icon, format) => `/app-icons/${id}/${icon}.${format}`,
    /**
     * formats: `PNG, JPEG, WebP`
     */
    applicationCover: (id, coverImage, format) => `/app-icons/${id}/${coverImage}.${format}`,
    /**
     * formats: `PNG, JPEG, WebP`
     */
    applicationAsset: (id, assetId, format) => `/app-icons/${id}/${assetId}.${format}`,
    /**
     * formats: `PNG, JPEG, WebP`
     */
    teamIcon: (id, icon, format) => `team-icons/${id}/${icon}.${format}`,
    /**
     * formats: `PNG, JSON`
     */
    sticker: (id, format) => `/stickers/${id}.${format}`,
    /**
     * formats: `PNG, JPEG, WebP`
     */
    roleIcon: (id, icon, format) => `/role-icons/${id}/${icon}.${format}`,
    /**
     * formats: `PNG, JPEG, WebP, GIF`
     */
    guildMemberBanner: (guildID, userID, banner, format) => `/guilds/${guildID}/users/${userID}/banners/${banner}.${format}`,
};
var URLFomats;
(function (URLFomats) {
    URLFomats["JPEG"] = "jpeg";
    URLFomats["PNG"] = "png";
    URLFomats["WebP"] = "webp";
    URLFomats["GIF"] = "gif";
    URLFomats["JSON"] = "json";
})(URLFomats || (exports.URLFomats = URLFomats = {}));
;
const Vdiscord = 10;
exports.Routers = {
    api: "https://discord.com/api/v" + Vdiscord,
    cdn: "https://cdn.discordapp.com",
    invite: "https://discord.gg",
    template: "https://discord.new",
    gift: "https://discord.gift",
    scheduledEvent: "https://discord.com/events",
    gateway: `wss://gateway.discord.gg/?v=${Vdiscord}&encoding=json`
};
exports.Version = "0.0.1-alpha";
exports.authorizationURL = `https://discord.com/api/v${Vdiscord}/oauth2/authorize`;
exports.tokenURL = `https://discord.com/api/v${Vdiscord}/oauth2/token`;
