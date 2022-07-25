import supertest from "supertest";
import app from "../src/index.js"
import prisma from "../src/config/database.js";
import { createExam } from "./factories/examFactory.js";
import { addUser, signUpAndLogin } from "./factories/userFactory.js";

beforeEach(async () => {
    await prisma.$executeRaw`TRUNCATE TABLE exams`
    await prisma.$executeRaw`TRUNCATE TABLE users CASCADE`    
})

describe("POST /exam", () => {
    it("Return 201 for valid exam entry", async() => {
        const exam = createExam();

        const {token} = await signUpAndLogin()
        const Authorization = `Bearer ${token}`;

        const res = await supertest(app).post("/exam").send(exam).set({Authorization});

        expect(res.status).toBe(201)
    })

    it("Return 403 for missing authorization token", async() => {
        const exam = createExam();

        const res = await supertest(app).post("/exam").send(exam);

        expect(res.status).toBe(403)
    })

    it("Return 400 for invalid entry", async() => {
        const exam = createExam();

        const {token} = await signUpAndLogin()

        const Authorization = `Bearer ${token}`;

        const res = await supertest(app).post("/exam").send({
            ...exam,
            disciplineId: 0
        }).set({Authorization});

        expect(res.status).toBe(400)
    })

    it("Return 422 for missing credentials", async() => {
        const exam = createExam();

        const {token} = await signUpAndLogin()

        const Authorization = `Bearer ${token}`;
        
        const res = await supertest(app).post("/exam").send({
            ...exam,
            name: ''
        }).set({Authorization});

        expect(res.status).toBe(422)
    })
})

afterAll(async () => {
    await prisma.$disconnect();
})