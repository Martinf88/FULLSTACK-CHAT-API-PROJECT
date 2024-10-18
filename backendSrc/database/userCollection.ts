import { MongoClient, WithId } from "mongodb";
import { User } from "../models/userModel";


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
		const col = db.collection<User>('users');
		return {col, client};
	} catch (error) {
		console.error('Database conenction error: ', error);
		throw error;
	}
}

async function getAllUsers(): Promise<WithId<User>[]> {
    const {col, client} = await connectToDatabase();
    try {
        const result: WithId<User>[] = await col.find({}).toArray();
        return result;
    } catch (error) {
        console.error('Error fetching users: ', error);
        throw new Error("Could not fetch users");
    } finally {
        await client.close();
    }
}

export { getAllUsers }