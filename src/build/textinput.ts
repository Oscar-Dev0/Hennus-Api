import { APITextInputComponent } from "discord-api-types/v10";

type TextInputStyle = "Paragraph" | "Short";

export class TextInputBuilder {
    public type: 4;
    public custom_id?: APITextInputComponent["custom_id"];
    public style?: APITextInputComponent["style"];
    public label?: APITextInputComponent["label"];
    public min_length?: APITextInputComponent["min_length"];
    public max_length?: APITextInputComponent["max_length"];
    public required?: APITextInputComponent["required"];
    public value?: APITextInputComponent["value"];
    public placeholder?: APITextInputComponent["placeholder"];

    constructor(option?: APITextInputComponent) {
        this.type = 4;
        this.custom_id = option?.custom_id;
        this.style = option?.style;
        this.label = option?.label;
        this.min_length = option?.min_length;
        this.max_length = option?.max_length;
        this.required = option?.required;
        this.placeholder = option?.placeholder;
    }

    public SetCustomID(custom: APITextInputComponent["custom_id"]) {
        this.custom_id = custom;
        return this;
    }

    public SetStyle(style: APITextInputComponent["style"] | TextInputStyle) {
        const styleMap: { [key: string]: APITextInputComponent["style"] } = {
            "Paragraph": 1,
            "Short": 2
        };

        this.style = typeof style === "number" ? style : styleMap[style];
        return this;
    }

    public SetLabel(label: APITextInputComponent["label"]) {
        this.label = label;
        return this;
    }

    public SetMinLength(value: APITextInputComponent["min_length"]) {
        if (typeof value === "number") {
            this.min_length = value;
        }
        return this;
    }

    public SetMaxLength(value: APITextInputComponent["max_length"]) {
        if (typeof value === "number") {
            this.max_length = value;
        }
        return this;
    }

    public SetRequired(boolean: APITextInputComponent["required"]) {
        this.required = boolean;
        return this;
    }

    public SetValue(value: APITextInputComponent["value"]) {
        this.value = value;
        return this;
    }

    public SetPlaceholder(value: APITextInputComponent["placeholder"]) {
        this.placeholder = value;
        return this;
    }
}
