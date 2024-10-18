import { WithId } from "mongodb";
import { DirectMessage } from "../models/directMessageModel";
import { getDB } from "./database.js";

async function getAllDirectMessages(): Promise<WithId<DirectMessage>[]> {
    try {
		const db = getDB()
        const directMessages = await db.collection<DirectMessage>('directMessages').find({}).toArray();

        return directMessages;

    } catch (error) {
        console.error('Error fetching DMs: ', error);
        throw new Error("Could not fetch DMs");
    } 
	// finally {
    //     await client.close();
    // }
}

export { getAllDirectMessages }