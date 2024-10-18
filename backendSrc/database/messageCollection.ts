import { MongoClient, WithId } from "mongodb";
import { Message } from "../models/messageModel";


const con = process.env.CONNECTION_STRING;

async function connectToDatabase() {
	if (!con) {
        console.log('No connection string, check your .env file!');
        throw new Error('No connection string');
    }

	const client = new MongoClient(con);
	try{
		await client.connect();
		const db = client.db('Chappy');
		const col = db.collection<Message>('messages');
		return {col, client};
	} catch (error) {
		console.error('Database conenction error: ', error);
		throw error;
	}
}

async function getAllMessages(): Promise<WithId<Message>[]> {
    const {col, client} = await connectToDatabase();
    try {
        const result: WithId<Message>[] = await col.find({}).toArray();
        return result;
    } catch (error) {
        console.error('Error fetching messages: ', error);
        throw new Error("Could not fetch messages");
    } finally {
        await client.close();
    }
}

export { getAllMessages }