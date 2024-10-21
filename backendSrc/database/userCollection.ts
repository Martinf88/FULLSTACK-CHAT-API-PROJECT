import { WithId } from "mongodb";
import { User } from "../models/userModel.js";
import { getDB } from "./database.js";

async function getAllUsers(): Promise<WithId<User>[]> {
    try {
		const db = getDB()
        const users = await db.collection<User>('users').find({}).toArray();
        return users;
    } catch (error) {
        console.error('Error fetching users: ', error);
        throw new Error("Could not fetch users");
    }
}

export { getAllUsers }