import express, {Express} from 'express'

const app: Express = express()
const PORT: number = Number(process.env.PORT || 1313)

app.use('/', express.static('dist/'))
app.use('/', express.json())


app.listen(PORT, () => {
	console.log(`Server is listening on port ${PORT}...`)
})