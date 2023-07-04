import { APIActionRowComponent, APIActionRowComponentTypes } from "discord-api-types/v10";
export declare class ActionRowBuilder {
    type: APIActionRowComponent<APIActionRowComponentTypes>['type'];
    components: APIActionRowComponent<APIActionRowComponentTypes>['components'];
    constructor(options?: formats[]);
    AddComponets(components: APIActionRowComponent<APIActionRowComponentTypes>['components']): this;
    AddComponet(component: formats): this;
    private save;
}
import { ButtonsBuilder } from "./buttons";
import { SelectMenuBuilder } from "./selectmenu";
import { TextInputBuilder } from "./textinput";
type formats = ButtonsBuilder | SelectMenuBuilder | TextInputBuilder;
export {};
