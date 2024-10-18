import express, { Response, Router } from 'express'
import { WithId } from 'mongodb'

import { DirectMessage } from '../models/directMessageModel.js'
import { getAllDirectMessages } from '../database/directMessagCollection.js'


export const directMessagesRouter: Router = express.Router()

directMessagesRouter.get('/', async ( _, res: Response) => {
	try {
		const messages: WithId<DirectMessage>[] = await getAllDirectMessages()
		res.send(messages);
	} catch (error) {
		console.error('Error retrieving DMs:', error);
        res.sendStatus(500);
	}
})
