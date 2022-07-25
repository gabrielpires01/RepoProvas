import prisma from "../config/database.js"

const addSession = async (token:string, userId: number) => {
    await prisma.sessions.create({
        data: {
            token,
            userId
        }
    })
    return
}

export {
    addSession,
}