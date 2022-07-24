import { users } from "@prisma/client";
import { createUser } from "../../tests/factories/userFactory.js";
import prisma from "../config/database.js";
import { UserType } from "../controllers/userController.js";

const signup =async (user:UserType) => {
    await prisma.users.create({
        data: user
    })
    return 
}

const getUser =async (email:string) => {
    const user =  await prisma.users.findUnique({
        where: {
            email
        }
    })
    return user
}

export {
    signup,
    getUser,
}