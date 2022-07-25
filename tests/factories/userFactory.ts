import { faker } from "@faker-js/faker"
import bcrypt from "bcrypt";
import prisma from "../../src/config/database.js";

const createUser = () => {
    const user = {
        email: faker.internet.email(),
        password: bcrypt.hashSync("1234", 10)
    }
    return user
}

const addUser = async() => {
    const user = createUser();

    await prisma.users.create({
        data: user
    })

    return {
        email: user.email,
        password: "1234"
    }
}

export {
    createUser,
    addUser,
}