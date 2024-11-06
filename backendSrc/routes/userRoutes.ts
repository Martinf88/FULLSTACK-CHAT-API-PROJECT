import express, { Response, Router, Request } from "express";
import { User } from "../models/userModel";
import { WithId } from "mongodb";
import { getAllUsers, postUser } from "../database/userCollection.js";
import { validateUser } from "../validation/validateUser.js";

export const usersRouter: Router = express.Router();

usersRouter.get("/", async (_, res: Response) => {
  try {
    const users: WithId<User>[] = await getAllUsers();
    res.send(users);
  } catch (error) {
    console.error("Error retrieving users:", error);
    res.sendStatus(500);
  }
});

// --POST--
usersRouter.post("/", async (req: Request, res: Response) => {
  try {
    const validation = await validateUser(req.body);

    if (!validation.success) {
      res.status(400).json({ error: validation.error });
      return;
    }

    const newUser: User = validation.value;

    await postUser(newUser);

    res.status(201).json(newUser);
  } catch (error) {
    console.error("Error adding item: ", error);
    res.sendStatus(500);
  }
});
