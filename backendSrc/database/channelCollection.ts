import { MongoClient, WithId } from "mongodb";
import { Channel } from "../models/channelModel";


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
		const col = db.collection<Channel>('channels');
		return {col, client};
	} catch (error) {
		console.error('Database conenction error: ', error);
		throw error;
	}
}

async function getAllChannels(): Promise<WithId<Channel>[]> {
    const {col, client} = await connectToDatabase();
    try {
        const result: WithId<Channel>[] = await col.find({}).toArray();
        return result;
    } catch (error) {
        console.error('Error fetching users: ', error);
        throw new Error("Could not fetch users");
    } finally {
        await client.close();
    }
}

export { getAllChannels }