import express, {Express, Request, NextFunction} from 'express'
import { usersRouter } from './routes/userRoutes.js'
import { channelsRouter } from './routes/channelRoutes.js'
import { messagesRouter } from './routes/messageRoutes.js'
import { directMessagesRouter } from './routes/directMessageRoutes.js'

const app: Express = express()
const PORT: number = Number(process.env.PORT || 1313)

app.use('/', express.static('dist/'))
app.use('/', express.json())

app.use('/', (req: Request, _, next: NextFunction) => {
	console.log(`${req.method} ${req.url}`, req.body);
	next()	
})

app.use('/api/users', usersRouter)
app.use('/api/channels', channelsRouter)
app.use('/api/messages', messagesRouter)
app.use('/api/directMessages', directMessagesRouter)



app.listen(PORT, () => {
	console.log(`Server is listening on port ${PORT}...`)
})