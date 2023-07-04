"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Client = void 0;
const v10_1 = require("discord-api-types/v10");
const base_1 = require("./base");
const rest_1 = require("../rest");
const wss_1 = require("../wss");
class Client extends base_1.BaseClient {
    constructor(options) {
        super();
        this.token = options.token || "";
        this.intents = options.intents.reduce((a, b) => a + b, v10_1.GatewayIntentBits.MessageContent);
        this.rest = new rest_1.RestSession(this);
        this.wss = new wss_1.WebSession(this, this.rest.api);
    }
    ;
    login() {
        this.wss.connect();
    }
    ;
}
exports.Client = Client;
;
