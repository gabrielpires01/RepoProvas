import { users } from "@prisma/client";
import { Request, Response } from "express";
import * as userService from "../services/userServices.js"

export type UserType = Omit<users, "id" | "createdAt">

const create = async (req: Request, res: Response) => {
    const user: UserType = req.body;

    await userService.create(user)

    return res.sendStatus(201)
}

const login =async (req:Request, res:Response) => {
    const user: UserType = req.body;

    const token = await userService.login(user)

    return res.send({token})
}

export {
    create,
    login,
}