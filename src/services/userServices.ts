import { UserType } from "../controllers/userController.js";
import bcrypt from "bcrypt";
import { getUser, signup } from "../repositories/userRepository.js";

const create = async (user: UserType) => {
    if (!user.email || !user.password) throw {message: "missing email or username", status: 400}
    const existUser = await getUser(user.email)
    
    if (existUser) throw {message: "Email already in use", status: 409}
    
    const hashedPassword = bcrypt.hashSync(user.password, 10);

    await signup({email: user.email, password: hashedPassword})

    return
}

export {
    create,
}