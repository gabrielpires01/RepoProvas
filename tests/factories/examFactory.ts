import { faker } from "@faker-js/faker"

const createExam = () => {
    const exam = {
        name: faker.random.word(),
        link: faker.random.word() + ".pdf",
        categoryId: 1,
        instructorId: 1,
        disciplineId: 1
    }

    return exam
}

export {
    createExam,
}