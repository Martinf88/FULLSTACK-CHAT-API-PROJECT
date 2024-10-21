import express, { Response, Router } from 'express'
import { WithId } from 'mongodb'

import { Message } from '../models/messageModel.js'
import { getAllMessages } from '../database/messageCollection.js'


export const messagesRouter: Router = express.Router()

messagesRouter.get('/', async ( _, res: Response) => {
	try {
		const messages: WithId<Message>[] = await getAllMessages()
		res.send(messages);
	} catch (error) {
		console.error('Error retrieving messages:', error);
        res.sendStatus(500);
	}
})


