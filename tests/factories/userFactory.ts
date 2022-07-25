import { faker } from "@faker-js/faker"
import bcrypt from "bcrypt";
import prisma from "../../src/config/database.js";
import { getUser } from "../../src/repositories/userRepository.js";
import { createToken } from "../../src/services/userServices.js";

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

const signUpAndLogin =async () => {
    const fakeUser = await addUser();
    const user = await getUser(fakeUser.email);
    const token = await createToken(user.id);

    await prisma.sessions.create({
        data: {
            token,
            userId: user.id
        }
    });

    return {token, user}
}

export {
    createUser,
    addUser,
    signUpAndLogin,
}