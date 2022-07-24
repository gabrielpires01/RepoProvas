import supertest from "supertest";
import { createUser } from "./factories/userFactory.js"
import app from "../src/index.js"
import prisma from "../src/config/database.js";

beforeAll(async () => {
    await prisma.$executeRaw`TRUNCATE TABLE users`
})

afterAll(async () => {
    await prisma.$disconnect();
})

describe("POST /signup", () => {

    const user = createUser();
    it("return 201 for valid signup",async ()=> {
        const res = await supertest(app).post("/signup").send(user);
        
        expect(res.status).toBe(201)
    })

    it("return 409 for conflict inserting user",async () => {
        const res = await supertest(app).post("/signup").send(user);
        
        expect(res.status).toBe(409)
    })

    it("return 422 for missing credential",async () => {
        const res = await supertest(app).post("/signup").send({password:user.password});
        
        expect(res.status).toBe(422)
    })
})

