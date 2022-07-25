import prisma from "../config/database.js"
import { ExamType } from "../controllers/examController.js"

const createExam =async (exam:ExamType) => {
    await prisma.exams.create({
        data: exam
    })
    return 
}

const getCategory =async (categoryId:number) => {
    return await prisma.categories.findUnique({
        where: {
            id:categoryId
        }
    })
}

const getInstructor =async (instructorId:number) => {
    return await prisma.categories.findUnique({
        where: {
            id:instructorId
        }
    })
}

const getDiscipline =async (disciplineId:number) => {
    return await prisma.categories.findUnique({
        where: {
            id:disciplineId
        }
    })
}

export {
    createExam,
    getCategory,
    getDiscipline,
    getInstructor,
}