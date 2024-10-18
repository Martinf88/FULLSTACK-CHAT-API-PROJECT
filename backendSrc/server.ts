import express, {Express, Request, NextFunction} from 'express'
import { usersRouter } from './routes/userRoutes.js'
import { channelsRouter } from './routes/channelRoutes.js'
import { messagesRouter } from './routes/messageRoutes.js'
import { directMessagesRouter } from './routes/directMessageRoutes.js'
// import { loginRouter } from './routes/loginRoute.js'
import { connectDB } from './database/database.js'

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
// app.use('/api/login', loginRouter)

async function startServer() {
	try {
		await connectDB()
		app.listen(PORT, () => {
			console.log(`Server is listening on port ${PORT}...`)
		})
	} catch (error) {
		console.error('Failed to connect to the database:', error);


		// TODO: fråga David om process.exit(1)
		// 1 = Ending process with some failure
		process.exit(1)
	}
}

startServer()


