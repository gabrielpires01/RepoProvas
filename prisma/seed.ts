import bcrypt from "bcrypt"
import prisma from "../src/config/database.js";
import { getUser } from "../src/repositories/userRepository.js";
import { createToken } from "../src/services/userServices.js";

const main = async () => {
    const password = bcrypt.hashSync("1234", 10);

    await prisma.users.upsert({
        where: {email: "teste@teste.com"},
        update: {},
        create: {
            email: "teste@teste.com",
            password
        }
    });

    const user = await getUser("teste@teste.com");
    const token = await createToken(user.id);

    await prisma.sessions.create({
        data: {
            token,
            userId: user.id
        }
    })

    const categories = [
        {name: "P1"},
        {name: "P2"},
        {name: "P3"},
        {name: "PF"},
        {name: "P2ch"}
    ];
    await prisma.categories.createMany({
        data: categories
    });

    const instructors = [
        {name: "Pedro"},
        {name: "Bruna"},
        {name: "Jorge"},
        {name: "Ratton"},
        {name: "Miguel"}
    ];
    await prisma.instructors.createMany({
        data: instructors
    });

    const disciplines = [
        {name: "Fisica"},
        {name: "Calculo"},
        {name: "Programação"},
        {name: "Quimica"},
        {name: "Biologia"}
    ]
    await prisma.disciplines.createMany({
        data: disciplines
    });
}


try {
    main().finally(async () => {
        await prisma.$disconnect()
    })
} catch(err) {
    console.log(err);
    process.exit(1);
}