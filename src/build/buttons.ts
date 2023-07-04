import { APIButtonComponent, ButtonStyle } from "discord-api-types/v10";

export class ButtonsBuilder  {


    public type : number;
    public style : APIButtonComponent["style"];
    public label : APIButtonComponent["label"];
    public emoji : APIButtonComponent["emoji"];
    public custom_id?: string;
    public url?: string;

    constructor(options?: APIButtonComponent ){
        this.type = 2;
        this.style = options?.style || 1;
        this.label = options?.label;
        this.emoji = { name: options?.emoji?.name, id: options?.emoji?.id, animated: options?.emoji?.animated };
        this.custom_id = undefined;
        this.url = undefined;

        if( options?.style == ButtonStyle.Link ){
            this.url = options?.url;
        } else {
            this.custom_id = options?.custom_id ?? undefined;
        };
    };

     SetStyle(style: ButtonStyle | "Primary" | "Secondary" | "Success" | "Danger" | "Link" ){
        if(typeof style  == "string"){
            let number: ButtonStyle = 1;
            if(style == "Primary"){ number = 1; } else if(style == "Secondary"){ number = 2; } else if(style == "Success"){ number = 3; } else if(style == "Danger"){ number = 4; } else if(style == "Link"){ number = 5; };
            this.style = number;

        } else if(typeof style == "number"){
            this.style = style;
        };

        return  this;
    };

     SetLabel (label: string){
        if(label == undefined){
            this.label = undefined;
        };

        if(typeof label == "string"){
            this.label = label.slice(0, 80);
        };

        return this;
    };

     SetEmoji(name: APIButtonComponent["emoji"] | string, id?: string, animated?: boolean){
        if(name == undefined){
            this.emoji = { name: undefined, id: undefined,animated: undefined };
        };

        if(typeof name == "object"){
            this.emoji = name;
        } else if(typeof name == "string"){
            const options = {
                 name,
                 id,
                 animated
            };
            this.emoji = options;
        };

        return this;

    };

     SetCustomId(id: string){
        if(typeof id == "string"){
            this.custom_id = id;
        };

        return this;
    };

     SetURL(url: string){
        if(typeof url == "string"){
            if(this.style == 5){
                this.url = url;
            };
        };

        return this;
    };

};

