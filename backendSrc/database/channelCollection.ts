import { WithId, ObjectId } from "mongodb";
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

async function getChannelById(channelId: string): Promise<WithId<Channel> | null> {
    const db = getDB(); 

	const objectId = new ObjectId(channelId);

    return await db.collection<Channel>('channels').findOne({ _id: objectId });
}


export { getAllChannels, getChannelById }