// import express, { Router, Request, Response } from "express"



// export const loginRouter: Router = express.Router()

// loginRouter.post('/', async (req: Request, res: Response) => {
// 	const { email, password } = req.body

// 	if( !process.env.SECRET ) {
// 		res.sendStatus(500)
// 		return
// 	}

// 	try {
// 		const user = await 
// 	}

// 	const userId = validateLogin(req.body.username, req.body.password)


// 	if( !userId ) {
// 		res.sendStatus(401)
// 		return
// 	}

// 	const payload = {
// 		userId
// 	}
// 	const token: string = sign(payload, process.env.SECRET)
// 	res.send({ jwt: token })
// })