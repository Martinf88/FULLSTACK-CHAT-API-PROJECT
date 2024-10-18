import express, { Router, Request, Response } from "express"
import { getDB } from "../database/database";
import { User } from "../models/userModel";



export const loginRouter: Router = express.Router()

loginRouter.post('/', async (req: Request, res: Response) => {
	const { username, password } = req.body;

	if ( !username || !password ) {
		res.status(400).send({ message: "Username and password are required" })
		return
	}

	try {
		const db = getDB()
		const usersCollection = db.collection<User>('users');

		const user = await usersCollection.findOne({ username })

		if ( !user ) {
			res.status(404).send({ message: 'User not found' })
			return
		}

		if ( user.password !== password ) {
			res.status(401).send( { message: "Invalid password" })
			return
		}
	} catch(error) {
		console.error('Error during login: ', error);
		res.status(500).send( { message: "Internal server error" } )
	}

})