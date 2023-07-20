import { APIActionRowComponent, APIActionRowComponentTypes } from "discord-api-types/v10";
import { ButtonsBuilder } from "./buttons";
import { SelectMenuBuilder } from "./selectmenu";
import { TextInputBuilder } from "./textinput";

type ComponentFormats = ButtonsBuilder | SelectMenuBuilder | TextInputBuilder;

export class ActionRowBuilder {
    public type: APIActionRowComponent<APIActionRowComponentTypes>['type'] = 1;
    public components: ComponentFormats[] = [];

    constructor(options?: ComponentFormats[]) {
        if (options) {
            this.save(options);
        }
    }

    public AddComponents(components: ComponentFormats[]): this {
        this.save(components);
        return this;
    }

    public AddComponent(component: ComponentFormats): this {
        this.save([component]);
        return this;
    }

    private save(components: ComponentFormats[]): void {
        //@ts-ignore
        this.components.push(...components);
    }
}
