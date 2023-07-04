"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.GuildMember = void 0;
const base_1 = require("../../base");
class GuildMember extends base_1.BaseData {
    constructor(member, guild, client) {
        super(client);
        this.guild = guild;
        this.dataMember = member;
    }
    ;
}
exports.GuildMember = GuildMember;
;
