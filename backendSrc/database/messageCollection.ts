import { InsertOneResult, ObjectId, WithId } from "mongodb";
import { Message } from "../models/messageModel";
import { User } from '../models/userModel.js'
import { getDB } from "./database.js";
import { Channel } from "../models/channelModel.js";


//GET senderId and productId for display in cart
async function getUserById(senderId: string): Promise<WithId<User> | null> {
	const db = getDB()
	const userCol = db.collection<User>('users')
	return await userCol.findOne({ _id: new ObjectId(senderId) });
}

async function getChannelById(channelId: string): Promise<WithId<Channel> | null> {
	const db = getDB()
	const channelCol = db.collection<Channel>('channels')
	return await channelCol.findOne({ _id: new ObjectId(channelId)})
}

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

async function postMessage(newMessage: Message): Promise<InsertOneResult<Message>> {
	try {
		const db = getDB();
		const messagesCol =  db.collection<Message>('messages')

		const result: InsertOneResult<Message> = await messagesCol.insertOne(newMessage)

		console.log('New message posted successfully:', {
			insertedId: result.insertedId,
			messageContent: newMessage.content, 
		});
		
		return result;
	} catch (error) {
		console.error('Error posting new message: ', error);
		throw new Error("Could not post new message");
	}
}


export { getAllMessages, getMessagesByChannelId, postMessage, getUserById, getChannelById };