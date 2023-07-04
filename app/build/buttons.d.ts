import { APIButtonComponent, ButtonStyle } from "discord-api-types/v10";
export declare class ButtonsBuilder {
    type: number;
    style: APIButtonComponent["style"];
    label: APIButtonComponent["label"];
    emoji: APIButtonComponent["emoji"];
    custom_id?: string;
    url?: string;
    constructor(options?: APIButtonComponent);
    SetStyle(style: ButtonStyle | "Primary" | "Secondary" | "Success" | "Danger" | "Link"): this;
    SetLabel(label: string): this;
    SetEmoji(name: APIButtonComponent["emoji"] | string, id?: string, animated?: boolean): this;
    SetCustomId(id: string): this;
    SetURL(url: string): this;
}
