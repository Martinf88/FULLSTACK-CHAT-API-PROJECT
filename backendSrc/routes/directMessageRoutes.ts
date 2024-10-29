import express, { Response, Router, Request } from 'express'
import { WithId } from 'mongodb'
import jwt from 'jsonwebtoken'
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

	if (!senderId || !receiverId) {
		res.status(400).json({ message: 'Sender and receiver IDs are required' });
		return 
	}
	if (!process.env.SECRET) {
		res.sendStatus(500);
		return
	}

	const token = req.headers.authorization;
	if (!token) {
		res.status(403).json({ message: 'Authorization required' });
		return
	}

	let payload: any;
	try {
		payload = jwt.verify(token, process.env.SECRET)
		console.log('Token payload: ', payload);
		

		
	} catch (error) {
		res.status(403).json({ message: 'Invalid token' });
		return
	}

	try {
		const dm: WithId<DirectMessage>[] = await getDM(senderId, receiverId)

		if (!dm || dm.length === 0) {
			res.status(404).json({ message: 'No direct messages found between these users' });
			return
		}

		res.status(200).json(dm);
	} catch (error) {
		res.status(500).json({ error: 'Could not fetch direct messages' });
	}
})
