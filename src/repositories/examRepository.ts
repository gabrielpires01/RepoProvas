import prisma from "../config/database.js"
import { ExamType, GroupBy  } from "../controllers/examController.js"

const createExam =async (exam:ExamType) => {
    await prisma.exams.create({
        data: exam
    })
    return 
}

const getExams= async(groupBy: GroupBy) => {
    const exams = prisma[`${groupBy}s`].findMany({
        select: {
            name: true,
            exams: {
                select: {
                    name: true,
                    link: true,
                    categories: {
                        select: {
                            name: true
                        }
                    },
                    [`${groupBy}s` === "instrures" ? 
                        "disciplines" : 
                        "instructors"
                    ]: {
                        select: {
                            name: true
                        }
                    }
                }
            }
        }
    })

    console.log()

    return exams
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
    getExams
}