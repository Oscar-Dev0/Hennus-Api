// Import required types and classes
import { APIUser, UserPremiumType } from "discord-api-types/v10";
import { Client } from "../../core";
import { ImageURLOptions } from "@discordjs/rest";
import { BaseData } from "../base/data";

// Declare the class
export class BaseUser extends BaseData {
    // Properties of the class based on the APIUser data
    public id: string;
    public username: string;
    public discriminator: string;
    public premium: UserPremiumType;
    public bot: boolean;
    public globalName: string;
    public color: number;
    public avatar: string | undefined;
    public banner: string | undefined;

    constructor(private data: APIUser, client: Client) {
        // Call the constructor of the parent class (BaseData)
        super(client);

        // Set the values of the properties using the "data" parameter passed to the constructor
        this.id = data.id;
        this.username = data.username;
        this.discriminator = data.discriminator;
        this.premium = data.premium_type ?? UserPremiumType.None;
        this.bot = data.bot ?? false;
        this.globalName = data.global_name ?? "";
        this.color = data.accent_color ?? 0;
        this.avatar = data.avatar ?? undefined;
        this.banner = data.banner ?? undefined;
    }

    // Method to get the URL for the user's avatar
    avatarUrl(options?: ImageURLOptions) {
        if (!this.avatar) return undefined;
        return this.cdn.avatar(this.id, this.avatar, options);
    }

    // Method to get the URL for the user's banner
    bannerURL(options?: ImageURLOptions) {
        if (!this.banner) return undefined;
        return this.cdn.banner(this.id, this.banner, options);
    }

    // Method to convert the user data to JSON
    toJson() {
        return this.data;
    };

    toString(){
        if(this.id) return `<@${this.id}>`;
        else return "";
    };
};
