import { Client } from "../../core";
import axios from "axios";
import { resolvedColor } from "../../utils";

export class BaseData {
    constructor( public readonly client: Client){
        Object.defineProperty(this, "client", { value: client } );
    };

    get cdn(){
        return this.client.rest.cdn;
    };

    get rest(){
        return this.client.rest;
    };

    async imagen(_url?: string) {
        if (!_url) return undefined;
        try {
            const header = [ 'image/jpeg', 'image/gif', 'image/png', 'image/x-icon', "imagen/webp", "image/webp" ];
            const url = await axios(_url, { responseType: "arraybuffer"});
            let type =  url.headers["content-type"] || url.headers["Content-Type"];

            if (url.status == 200 && header.includes(type)) { 
                let _type
                if (type === "image/jpeg") _type = "jpeg";
                else if (type === "image/gif") _type = "gif";
                else if (type === "image/png") _type = "png";
                else if (type === "image/x-icon") _type = "ico";
                else if (type === "image/webp" || type === "imagen/webp") _type = "webp";

                return {data: url.data, url: _url, type: _type as 'jpeg' | "gif" | "png" | "ico" | "webp", content_type: type};
            };
            return undefined;
        } catch {
            return undefined;
        };
    };

    colorResolved = resolvedColor;
    
};