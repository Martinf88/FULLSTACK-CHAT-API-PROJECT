import express, { Response, Router, Request } from 'express'
import { WithId } from 'mongodb'

import { Message } from '../models/messageModel.js'
import { getAllMessages, getMessagesByChannelId } from '../database/messageCollection.js'


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

messagesRouter.get('/:channelId', async ( req: Request, res: Response) => {
	const { channelId } = req.params;

	try {
		const messages: WithId<Message>[] = await getMessagesByChannelId(channelId)
		console.log('messages in backend: ', messages);
		
		res.send(messages);
	} catch (error) {
		console.error(`Error retrieving messages for channel ${channelId}: `, error);
        res.sendStatus(500);
	}
})


