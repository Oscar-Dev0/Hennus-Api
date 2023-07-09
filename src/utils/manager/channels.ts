import { Collection } from "@discordjs/collection";
import { Channel } from "../../types";

export class Channels extends Collection<string, Channel> {
    constructor() {
        super();
    };

    setall(map: Channel[]) {
        if (map && Array.isArray(map)) {
            map.forEach((channel) => { this.set(channel.id, channel); });
            return true;
        } else {
            return false;
        };
    };
};