import { Schema, model } from "mongoose";
import { GenerateSnowflake } from "../services/SnowflakeService";
import { ChannelDocument } from "../models/channel";

export interface GuildDocument extends Document {
    _id: string,
    name: string,
    channels: string[]
}

export const Guild = model<GuildDocument>('guild', new Schema({
    _id: {
        default: GenerateSnowflake,
        type: String
    },
    name: {
        required: true,
        type: String
    },
    channels: {}
}), "guilds")