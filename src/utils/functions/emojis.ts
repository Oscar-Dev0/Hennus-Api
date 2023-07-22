import { APIPartialEmoji } from "discord-api-types/v10";


function decodeEmoji(text: string): APIPartialEmoji {
    if (text.includes('%')) text = decodeURIComponent(text);


    if (!text.includes(':')) return { animated: undefined, name: text, id: null };

    const emojiMap = text.match(/<?(?:(a):)?(\w{2,32}):(\d{17,19})?>?/);
    if (emojiMap) return { animated: Boolean(emojiMap[1]), name: emojiMap[2], id: emojiMap[3] };
    return { animated: undefined, name: null, id: null }
};

function resolvePartialEmoji(emoji: APIPartialEmoji | string): APIPartialEmoji | null {
    if (!emoji) return null;
    if (typeof emoji === 'string') return /^\d{17,19}$/.test(emoji) ? { id: null, name: emoji } : decodeEmoji(emoji);


    const { id, name, animated } = emoji;
    if (!id && !name) return null;


    return { id, name, animated: Boolean(animated) };
}

export { resolvePartialEmoji, decodeEmoji };

