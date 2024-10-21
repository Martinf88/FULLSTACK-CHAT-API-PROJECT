import express, { Response, Router } from 'express'
import { User } from '../models/userModel'
import { WithId } from 'mongodb'
import { getAllUsers } from '../database/userCollection.js'

export const usersRouter: Router = express.Router()

usersRouter.get('/', async ( _, res: Response) => {
	try {
		const users: WithId<User>[] = await getAllUsers()
		res.send(users);
	} catch (error) {
		console.error('Error retrieving users:', error);
        res.sendStatus(500);
	}
})
