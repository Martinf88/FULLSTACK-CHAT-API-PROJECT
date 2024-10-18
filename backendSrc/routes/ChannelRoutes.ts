import express, { Response, Router } from 'express'
import { WithId } from 'mongodb'
import { getAllChannels } from '../database/channelCollection.js'
import { Channel } from '../models/channelModel.js'


export const channelsRouter: Router = express.Router()

channelsRouter.get('/', async ( _, res: Response) => {
	try {
		const channels: WithId<Channel>[] = await getAllChannels()
		res.send(channels);
	} catch (error) {
		console.error('Error retrieving channels:', error);
        res.sendStatus(500);
	}
})
