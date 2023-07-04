"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ActionRowBuilder = void 0;
class ActionRowBuilder {
    constructor(options) {
        this.type = 1;
        this.components = [];
        if (typeof options == "object") {
            this.save(options);
        }
        ;
    }
    ;
    AddComponets(components) {
        this.save(components);
        return this;
    }
    ;
    AddComponet(component) {
        const comp = [];
        comp.push(component);
        this.save(comp);
        return this;
    }
    ;
    save(components) {
        if (typeof components == "object") {
            if (components[0]) {
                components.forEach((x) => this.components.push(x));
            }
            ;
        }
        ;
    }
    ;
}
exports.ActionRowBuilder = ActionRowBuilder;
;
