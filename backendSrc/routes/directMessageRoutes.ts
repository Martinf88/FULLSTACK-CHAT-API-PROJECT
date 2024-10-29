import express, { Response, Router, Request } from 'express'
import { WithId } from 'mongodb'

import { DirectMessage } from '../models/directMessageModel.js'
import { getDM } from '../database/directMessagCollection.js'


export const directMessagesRouter: Router = express.Router()

directMessagesRouter.get('/:senderId/:receiverId', async ( req: Request, res: Response) => {
	const { senderId, receiverId } = req.params
	try {
		const dm: WithId<DirectMessage>[] = await getDM(senderId, receiverId)

		res.status(200).json(dm);
	} catch (error) {
		res.status(500).json({ error: 'Could not fetch direct messages' });
	}
})
