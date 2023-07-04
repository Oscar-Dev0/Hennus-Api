import { APISelectMenuComponent, APISelectMenuOption, ChannelType, ComponentType  } from "discord-api-types/v10";

export class SelectMenuBuilder {
    public custom_id?: APISelectMenuComponent['custom_id'];
    public type: APISelectMenuComponent['type'];
    public options: APISelectMenuOption[]; 
    public channel_types?: ChannelType[];
    public placeholder?: APISelectMenuComponent["placeholder"];
    public min_values?: APISelectMenuComponent["min_values"];
    public max_values?: APISelectMenuComponent["max_values"];
    public disabled?: APISelectMenuComponent["disabled"];

    constructor(options?: APISelectMenuComponent){
        this.custom_id = options?.custom_id;
        this.type = options?.type? options?.type : 3;
        if(options?.type == ComponentType.StringSelect){
            if(typeof options?.options == "object"){
                this.save(options.options);
            };
        } else if( options?.type == ComponentType.ChannelSelect){
            this.channel_types = options?.channel_types;
        };
        this.options = [];
        this.placeholder = options?.placeholder;
        this.min_values = options?.min_values;
        this.max_values = options?.max_values;
        this.disabled = options?.disabled;
    };

    SetCustomId(custom: APISelectMenuComponent["custom_id"]){
        this.custom_id = custom;
        return this;
    };

    SetType(type: selectMenuType){

        if(typeof type == "number"){
            this.type = type;
        } else if(typeof type == "string"){
            if(type == "Text") this.type == ComponentType.StringSelect;
            if(type == "User") this.type == ComponentType.UserSelect;
            if(type == "Role") this.type == ComponentType.RoleSelect;
            if(type == "Channels") this.type == ComponentType.ChannelSelect;
            if(type == "Mentionable") this.type == ComponentType.MentionableSelect;
        };
        return this;
    };
    
    setPlaceHolder(text: string){
        this.placeholder = text;
        return this;
    };

    /**
     * @description
     * funcion carga directamente las opciones al cache
     * @description 
     * esta funcion solo va con el tipo 3 es un menu de texto
     */
    SetOptions(options: APISelectMenuOption[]){
        this.options = options;
        return this;
    };

    /**
     * @description
     * esta funcion carga las opciones ya al cache que existe en el slectmenu.
     * @description 
     * esta funcion solo va con el tipo 3 es un menu de texto.
     */
    AddOptions(options: APISelectMenuOption[]){
        this.save(options);
        return this;
    };

    AddOption(option: APISelectMenuOption ){
        this.save([option]);
        return this;
    };

    /**
     * @description 
     * esta funcion solo va con el tipo 8 es un menu de texto.
     */
    SetChannelTypes(channel_types: ChannelType[]){
        this.channel_types = channel_types;
        return this;
    };

    SetMinValues(values: APISelectMenuComponent["min_values"]){
        if(typeof values == "number"){
            this.min_values = values;
            if(this.min_values > 25){
                this.min_values = 25;
            };
        };
        return this;
    };

    SetMaxValues(values: APISelectMenuComponent["max_values"]){
        if(typeof values == "number"){
            this.max_values = values;
            if(this.max_values > 25){
                this.max_values = 25;
            };
        };
        return this;
    };

    SetDisabled(boolean: APISelectMenuComponent["disabled"]){
        this.disabled = boolean;
        return this;
    };

    private save(options?: APISelectMenuOption[]){
        if(!options) return;
        if(!this?.type) return;
        if(this?.type == 3){
            const map = this.options;
            options.forEach((x)=>{
                map?.push(x);
            })
        }
    }
};

type selectMenuType = APISelectMenuComponent["type"] | "Text" | "User" | "Role" | "Channels" | "Mentionable";