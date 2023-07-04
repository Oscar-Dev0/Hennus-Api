import { APITextInputComponent, TextInputStyle } from "discord-api-types/v10";
export declare class TextInputBuilder {
    type: 4;
    custom_id?: APITextInputComponent["custom_id"];
    style?: APITextInputComponent["style"];
    label?: APITextInputComponent["label"];
    min_length: APITextInputComponent["min_length"];
    max_length: APITextInputComponent["max_length"];
    required: APITextInputComponent["required"];
    value: APITextInputComponent["value"];
    placeholder: APITextInputComponent["placeholder"];
    constructor(option?: APITextInputComponent);
    SetCustomID(custom: APITextInputComponent["custom_id"]): this;
    SetStyle(style: APITextInputComponent["style"] | TextInputStyle | "Paragraph" | "Short"): this;
    SetLabel(label: APITextInputComponent["label"]): this;
    SetMinLength(value: APITextInputComponent["min_length"]): this;
    SetMaxLength(value: APITextInputComponent["max_length"]): this;
    SetRequired(boolean: APITextInputComponent["required"]): this;
    SetValue(value: APITextInputComponent["value"]): this;
    SetPlaceholder(value: APITextInputComponent["placeholder"]): this;
}
