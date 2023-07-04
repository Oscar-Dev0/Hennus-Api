"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.BaseRest = void 0;
const rest_1 = require("@discordjs/rest");
class BaseRest {
    constructor(client) {
        this.api = new rest_1.REST().setToken(client.token);
    }
    ;
    get(link, req) {
        return __awaiter(this, void 0, void 0, function* () {
            const l = link;
            const data = yield this.api.get(l, req);
            console.log(data);
        });
    }
    ;
}
exports.BaseRest = BaseRest;
;
