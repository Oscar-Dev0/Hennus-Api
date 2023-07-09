import { Collection } from "@discordjs/collection";
import { Message } from "../../types";
import { RestSession } from "../../rest";

export class MessagesCollection extends Collection<string, Message> {

    public search = false;

    constructor() {
        super();
    };

    restSet(rest: RestSession, channel_id: string){
        if(!this.search) rest.get("channelMessages", channel_id).then((msgs)=>{ this.search = true; msgs?.forEach((msg)=>this.set(msg.id, msg))});
        return this;
    };
};