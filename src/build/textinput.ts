import { APITextInputComponent, TextInputStyle } from "discord-api-types/v10";

export class TextInputBuilder {
    public type : 4;
    public custom_id? : APITextInputComponent["custom_id"];
    public style? : APITextInputComponent["style"];
    public label? : APITextInputComponent["label"];
    public min_length : APITextInputComponent["min_length"];
    public max_length : APITextInputComponent["max_length"];
    public required : APITextInputComponent["required"];
    public value : APITextInputComponent["value"];
    public placeholder : APITextInputComponent["placeholder"];

    constructor(option?: APITextInputComponent){
        this.type = 4;
        this.custom_id = option?.custom_id;
        this.style = option?.style;
        this.label = option?.label;
        this.min_length = option?.min_length;
        this.max_length = option?.min_length;
        this.required = option?.required;
        this.placeholder = option?.placeholder; 
    };
    
    SetCustomID(custom: APITextInputComponent["custom_id"]){
        this.custom_id = custom;
        return this;
    };

    SetStyle(style : APITextInputComponent["style"] | TextInputStyle | "Paragraph" | "Short"){
        if(typeof style == "number"){
            this.style = style;
        } else if(typeof style == "string"){
            if(style == "Paragraph"){
                this.style = TextInputStyle.Paragraph;
            }else if(style == "Short"){
                this.style = TextInputStyle.Short;
            };
        };
        return this;
    };

    SetLabel(label: APITextInputComponent["label"]){
        this.label = label;
        return this;
    }; 

    SetMinLength(value : APITextInputComponent["min_length"]){
        this.min_length = value;
        return this;
    };

    SetMaxLength(value : APITextInputComponent["max_length"]){
        this.max_length = value;
        return this;
    };

    SetRequired(boolean: APITextInputComponent["required"]){
        this.required = boolean;
        return this;
    };
    
    SetValue(value : APITextInputComponent["value"]){
        this.value = value;
        return this;
    };

    SetPlaceholder(value : APITextInputComponent["placeholder"]){
        this.placeholder = value;
        return this;
    };

};