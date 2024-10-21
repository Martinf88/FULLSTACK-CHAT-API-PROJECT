import { WithId } from "mongodb";
import { Channel } from "../models/channelModel";
import { getDB } from "./database.js";


async function getAllChannels(): Promise<WithId<Channel>[]> {
    try {
		const db = getDB()
        const channels = await db.collection<Channel>('channels').find({}).toArray();
        return channels;
    } catch (error) {
        console.error('Error fetching users: ', error);
        throw new Error("Could not fetch users");
    } 
}

export { getAllChannels }