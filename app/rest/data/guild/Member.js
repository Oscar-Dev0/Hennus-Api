"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.GuildMember = void 0;
const data_1 = require("../../base/data");
class GuildMember extends data_1.BaseData {
    constructor(member, guild, client) {
        super(client);
        this.guild = guild;
        this.dataMember = member;
    }
    ;
}
exports.GuildMember = GuildMember;
;
