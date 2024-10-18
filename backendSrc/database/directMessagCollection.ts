import { MongoClient, WithId } from "mongodb";
import { DirectMessage } from "../models/directMessageModel";


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
		const col = db.collection<DirectMessage>('directMessages');
		return {col, client};
	} catch (error) {
		console.error('Database conenction error: ', error);
		throw error;
	}
}

async function getAllDirectMessages(): Promise<WithId<DirectMessage>[]> {
    const {col, client} = await connectToDatabase();
    try {
        const result: WithId<DirectMessage>[] = await col.find({}).toArray();
        return result;
    } catch (error) {
        console.error('Error fetching DMs: ', error);
        throw new Error("Could not fetch DMs");
    } finally {
        await client.close();
    }
}

export { getAllDirectMessages }