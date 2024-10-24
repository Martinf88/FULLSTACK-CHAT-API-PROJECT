import express, { Response, Router, Request } from 'express'
import { WithId } from 'mongodb'
import { Message } from '../models/messageModel.js'
import { getAllMessages, getMessagesByChannelId } from '../database/messageCollection.js'
import { Channel } from '../models/channelModel.js'
import { getChannelById } from '../database/channelCollection.js'
import jwt from 'jsonwebtoken'


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
		const channel: WithId<Channel> | null = await getChannelById(channelId)

		if(!channel) {
			res.status(404).json({ message: 'Channel not found' });
			return
		}

		if(channel.isLocked) {
			if( !process.env.SECRET ) {
				res.sendStatus(500)
				return
			}
			const token = req.headers.authorization;
			if(!token) {
				res.status(403).json({ message: 'Channel is locked, authorization required' });
				return
			}

			let payload: any;
			try {
				payload = jwt.verify(token, process.env.SECRET)
				console.log('Token payload: ', payload);
			} catch(error) {
				res.status(403).json({ message: 'Invalid token' });
				return
			}
		}

		const messages: WithId<Message>[] = await getMessagesByChannelId(channelId)
		console.log('messages in backend: ', messages);
		
		res.send(messages);
	} catch (error) {
		console.error(`Error retrieving messages for channel ${channelId}: `, error);
        res.sendStatus(500);
	}
})

