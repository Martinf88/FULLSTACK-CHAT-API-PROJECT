import { InsertOneResult, WithId } from "mongodb";
import { DirectMessage } from "../models/directMessageModel";
import { getDB } from "./database.js";


async function postDM(dm: DirectMessage): Promise<InsertOneResult<DirectMessage>> {
	try {
		const db = getDB();
		const dmCol =  db.collection<DirectMessage>('directMessages')

		const result: InsertOneResult<DirectMessage> = await dmCol.insertOne(dm)
		
		return result;
	} catch (error) {
		console.error('Error posting new message: ', error);
		throw new Error("Could not post new message");
	}
}

async function getAllDirectMessages(): Promise<WithId<DirectMessage>[]> {
    try {
		const db = getDB()
        const directMessages = await db.collection<DirectMessage>('directMessages').find({}).toArray();

        return directMessages;

    } catch (error) {
        console.error('Error fetching DMs: ', error);
        throw new Error("Could not fetch DMs");
    } 
}

async function getDM(senderId: string, receiverId: string): Promise<WithId<DirectMessage>[]> {
	try {
		const db = getDB()
		const dm = await db.collection<DirectMessage>('directMessages').find({
			$or: [
				{ senderId, receiverId},
				{ senderId: receiverId, receiverId: senderId}
			],
		}).toArray();

		return dm
	} catch (error) {
		console.error(' Error fetching DMs: ', error);
		throw new Error("Could not fetch DMs");
		
	}
}

export { getAllDirectMessages, getDM, postDM }