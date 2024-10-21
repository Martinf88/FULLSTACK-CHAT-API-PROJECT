import { MongoClient, Db } from "mongodb";


const con = process.env.CONNECTION_STRING;
let client: MongoClient
let db: Db;

async function connectDB() {
	if (!con) {
		console.log('No connection string, check your .env file!');
        throw new Error('No connection string');
    }
	const client = new MongoClient(con)
	
	try{
		await client.connect();
		db = client.db('Chappy');
		console.log('Connected to MongoDB');
	} catch (error) {
		console.error('MongoDB conenction error: ', error);
		throw error;
	}
}

function getDB(): Db {
	if(!db) {
		throw new Error("Database not initialized. Call connectDB() first.");
	}
	return db;
}


async function closeDB() {
	if (client) {
		await client.close()
		console.log('MongoDB connection closed');
	}
}

process.on('SIGINT', async () => {
	console.log('Shutting down server...');
	await closeDB()

	// 0 = End process without failure
	process.exit(0);
})


export { connectDB, getDB };