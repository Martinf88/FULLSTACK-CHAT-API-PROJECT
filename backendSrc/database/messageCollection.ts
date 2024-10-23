import { WithId } from "mongodb";
import { Message } from "../models/messageModel";
import { getDB } from "./database.js";


async function getAllMessages(): Promise<WithId<Message>[]> {
    try {
		const db = getDB()
        const messages = await db.collection<Message>('messages').find({}).toArray();
        return messages;
    } catch (error) {
        console.error('Error fetching messages: ', error);
        throw new Error("Could not fetch messages");
    } 
}

async function getMessagesByChannelId(channelId: string): Promise<WithId<Message>[]> {
	console.log('channelId in backend: ',channelId);
	
	try {
		const db = getDB();
		const messages = await db.collection<Message>('messages').find({ channelId }).toArray();
		return messages;
	} catch (error) {
		console.error('Error fetching messages: ', error);
		throw new Error("Could not fetch messages for this channel");
		
	}
}

export { getAllMessages, getMessagesByChannelId }