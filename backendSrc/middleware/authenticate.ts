// import jwt from 'jsonwebtoken'
// import { NextFunction, Request, Response } from 'express'

// const authenticate = (req: Request, res: Response, next: NextFunction) => {
// 	const token = req.headers.authorization;

// 	if (!process.env.SECRET) {
// 		res.sendStatus(500)
// 		return
// 	}

// 	if (!token) {
// 		return res.status(401).json({ message: 'Authorization token is required.' })
// 	}

// 	try {
// 		const decoded = jwt.verify(token, process.env.SECRET);
// 		req.user = decoded.user;
// 		next();
// 	} catch (err) {
// 		return res.status(401).json({ message: 'Invalid token.' });
// 	}
// }

// export { authenticate }