"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.WebSession = void 0;
const ws_1 = require("@discordjs/ws");
class WebSession extends ws_1.WebSocketManager {
    constructor(client, rest) {
        super({
            token: client.token,
            intents: client.intents,
            rest
        });
    }
    ;
}
exports.WebSession = WebSession;
;
