import { APIButtonComponent, ButtonStyle } from "discord-api-types/v10";

export class ButtonsBuilder {
    public type: number = 2;
    public style: APIButtonComponent["style"] = 1;
    public label?: APIButtonComponent["label"];
    public emoji: APIButtonComponent["emoji"] = { name: undefined, id: undefined, animated: undefined };
    public custom_id?: string;
    public url?: string;

    constructor(options?: APIButtonComponent) {
        if (options) {
            this.SetStyle(options.style);
            if (options.label) this.SetLabel(options.label);
            this.SetEmoji(options.emoji);
            if (options.style != 5) this.SetCustomId(options.custom_id);
            if (options.style == 5) this.SetURL(options.url);
        }
    }

    public SetStyle(style: ButtonStyle | "Primary" | "Secondary" | "Success" | "Danger" | "Link"): this {
        const stylesMap: { [key: string]: ButtonStyle } = {
            "Primary": 1,
            "Secondary": 2,
            "Success": 3,
            "Danger": 4,
            "Link": 5
        };

        this.style = typeof style === "string" ? stylesMap[style] || 1 : style;
        return this;
    }

    public SetLabel(label: string): this {
        this.label = typeof label === "string" ? label.slice(0, 80) : undefined;
        return this;
    }

    public SetEmoji(name: APIButtonComponent["emoji"] | string, id?: string, animated?: boolean): this {
        this.emoji = typeof name === "object" ? name : { name, id, animated };
        return this;
    }

    public SetCustomId(id: string): this {
        this.custom_id = typeof id === "string" ? id : undefined;
        return this;
    }

    public SetURL(url: string): this {
        this.url = this.style === 5 && typeof url === "string" ? url : undefined;
        return this;
    }
}
