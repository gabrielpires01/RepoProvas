import { UserType } from "../controllers/userController.js";
import bcrypt from "bcrypt";
import { getUser, signup } from "../repositories/userRepository.js";
import jwt from "jsonwebtoken";
import { addSession } from "../repositories/authRepoistory.js";

const create = async (user: UserType) => {
    const existUser = await verifyUser(user)
    if (existUser) throw {message: "Email already in use", status: 409}

    const hashedPassword = bcrypt.hashSync(user.password, 10);

    await signup({email: user.email, password: hashedPassword})

    return
}

const login =async (user:UserType) => {
    const existUser = await getUser(user.email)
    if (!existUser) throw {message: "Wrong email or password", status: 400}

    const verifyPassword = bcrypt.compareSync(user.password ,existUser.password)
    if(!verifyPassword) throw {message: "Wrong email or password", status: 400}

    const token = await createToken(existUser.id);

    await addSession(token, existUser.id)

    return token
}

const verifyUser =async (user:UserType) => {
    if (!user.email || !user.password) throw {message: "missing email or username", status: 400}
    const existUser = await getUser(user.email)
    
    return existUser
}

const createToken=async (id:number) => {
    const data = {id};
    const jwtKey = process.env.JWT_SECRET

    const token = jwt.sign(data, jwtKey)
    return token
}

export {
    create,
    login,
}