import { faker } from "@faker-js/faker"
import bcrypt from "bcrypt";

const createUser = () => {
    const user = {
        email: faker.internet.email(),
        password: bcrypt.hashSync("1234", 10)
    }
    return user
}
    

export {
    createUser,
}