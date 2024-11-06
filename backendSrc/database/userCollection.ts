import { InsertOneResult, WithId } from "mongodb";
import { User } from "../models/userModel.js";
import { getDB } from "./database.js";

async function postUser(user: User): Promise<InsertOneResult<User>> {
  try {
    const db = getDB();
    const userCol = db.collection<User>("users");

    const result: InsertOneResult<User> = await userCol.insertOne(user);

    return result;
  } catch (error) {
    console.error("Error creating nre user: ", error);
    throw new Error("Could not add new user");
  }
}

async function getAllUsers(): Promise<WithId<User>[]> {
  try {
    const db = getDB();
    const users = await db.collection<User>("users").find({}).toArray();
    return users;
  } catch (error) {
    console.error("Error fetching users: ", error);
    throw new Error("Could not fetch users");
  }
}

export { getAllUsers, postUser };
