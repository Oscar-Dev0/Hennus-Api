import { APIActionRowComponent, APIActionRowComponentTypes } from "discord-api-types/v10";


export class ActionRowBuilder {

    public type: APIActionRowComponent<APIActionRowComponentTypes>['type'];
    public components: APIActionRowComponent<APIActionRowComponentTypes>['components'];

    constructor(options?: formats[]) {
        this.type = 1;
        this.components = [];
        if (typeof options == "object") {
            this.save(options);
        };

    };

    AddComponets(components: APIActionRowComponent<APIActionRowComponentTypes>['components']) {
        this.save(components);
        return this;
    };

    AddComponet(component: formats) {
        const comp = [];
        comp.push(component);
        this.save(comp);
        return this;
    };


    private save(components: formats[] | APIActionRowComponent<APIActionRowComponentTypes>['components']) {
        if (typeof components == "object") {
            if (components[0]) {
                components.forEach((x: any) => this.components.push(x));
            };
        };

    };
};

import { ButtonsBuilder } from "./buttons";
import { SelectMenuBuilder } from "./selectmenu";
import { TextInputBuilder } from "./textinput";
type formats = ButtonsBuilder | SelectMenuBuilder | TextInputBuilder;