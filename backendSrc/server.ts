import express, {Express, Request, NextFunction} from 'express'
import { usersRouter } from './routes/userRoutes.js'
import { channelsRouter } from './routes/ChannelRoutes.js'
import { messagesRouter } from './routes/messageRoutes.js'

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



app.listen(PORT, () => {
	console.log(`Server is listening on port ${PORT}...`)
})