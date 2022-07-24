import { Request, Response } from "express";
import * as userService from "../services/userServices.js"

export interface UserType {
    email: string
    password: string
}

const create = async (req: Request, res: Response) => {
    const user: UserType = req.body;

    await userService.create(user)

    return res.sendStatus(201)
}

export {
    create,
}