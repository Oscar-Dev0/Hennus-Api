"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Guild = void 0;
const core_1 = require("../../../core");
const __1 = require("../../");
class Guild extends __1.BaseData {
    constructor(data, client) {
        super(client);
        this.data = data;
        this.id = data.id;
        this.name = data.name;
        this.description = data.description;
        this.icon = data.icon;
        this.banner = data.banner;
    }
    ;
    iconURL(format) {
        if (!this.icon)
            return undefined;
        return core_1.RoutesCDN.guildIcon(this.id, this.icon, format);
    }
    ;
    bannerURL(format) {
        if (!this.banner)
            return undefined;
        return core_1.RoutesCDN.guildBanner(this.id, this.banner, format);
    }
    ;
    toJson() {
        return this.data;
    }
    ;
}
exports.Guild = Guild;
;
