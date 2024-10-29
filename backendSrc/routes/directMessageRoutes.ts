import express, { Response, Router, Request } from 'express'
import { WithId } from 'mongodb'

import { DirectMessage } from '../models/directMessageModel.js'
import { getDM, postDM } from '../database/directMessagCollection.js'
import { validateDirectMessage } from '../validation/validateDm.js'


export const directMessagesRouter: Router = express.Router()

// --POST--
directMessagesRouter.post('/', async (req: Request, res: Response) => {
    try {
        const validation = await validateDirectMessage(req.body);

        if (!validation.success) {
            res.status(400).json({ error: validation.error })
			return
        }

        const dm: DirectMessage = validation.value

        await postDM(dm);

		res.status(201).json(dm)

    } catch (error) {
        console.error('Error adding item: ', error);
        res.sendStatus(500)
    }
});

directMessagesRouter.get('/:senderId/:receiverId', async ( req: Request, res: Response) => {
	const { senderId, receiverId } = req.params
	try {
		const dm: WithId<DirectMessage>[] = await getDM(senderId, receiverId)

		res.status(200).json(dm);
	} catch (error) {
		res.status(500).json({ error: 'Could not fetch direct messages' });
	}
})
