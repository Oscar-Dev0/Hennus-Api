import { APIPartialEmoji } from "discord-api-types/v10";

export function decodeEmoji(text: string) {
    if (text.includes('%')) text = decodeURIComponent(text);
    if (!text.includes(':')) return { isAnimated: false, name: text, id: undefined };
    const emojiMap = text.match(/<?(?:(a):)?(\w{2,32}):(\d{17,19})?>?/);
    return emojiMap && { isAnimated: Boolean(emojiMap[1]), name: emojiMap[2], id: emojiMap[3] };
};

export function resolvePartialEmoji(emoji: APIPartialEmoji | string) {
    if (!emoji) return null;
    if (typeof emoji === 'string') return /^\d{17,19}$/.test(emoji) ? { id: emoji } : decodeEmoji(emoji);
    const { id, name, animated } = emoji;
    if (!id && !name) return null;
    return { id, name, animated: Boolean(animated) };
};
