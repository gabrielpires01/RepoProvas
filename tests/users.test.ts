import supertest from "supertest";
import { addUser, createUser } from "./factories/userFactory.js"
import app from "../src/index.js"
import prisma from "../src/config/database.js";

beforeEach(async () => {
    await prisma.$executeRaw`TRUNCATE TABLE users CASCADE`
})

describe("POST /signup", () => {

    it("return 201 for valid signup",async ()=> {
        const user =  createUser();
        const res = await supertest(app).post("/signup").send(user);
        expect(res.status).toBe(201)
    })

    it("return 409 for conflict inserting user",async () => {
        const user = await addUser();
        const res = await supertest(app).post("/signup").send(user);
        
        expect(res.status).toBe(409)
    })

    it("return 422 for missing credential",async () => {
        const user = await addUser();
        const res = await supertest(app).post("/signup").send({password:user.password});
        
        expect(res.status).toBe(422)
    })
})

describe("POST /login", () => {

    it("return 201 for valid Login",async () => {
        const user =  await addUser();
        const res = await supertest(app).post("/login").send(user);

        expect(res.status).toBe(200)
    })

    it("return 400 for invalid user Login",async () => {
        const user =  {
            email: "teste@teste.com",
            password: "1234"
        }
        const res = await supertest(app).post("/login").send(user);

        expect(res.status).toBe(400)
    })

    it("return 422 for missing credential",async () => {
        const user =  await addUser();
        const res = await supertest(app).post("/login").send({email: user.email});

        expect(res.status).toBe(422)
    })
})

afterAll(async () => {
    await prisma.$disconnect();
})
