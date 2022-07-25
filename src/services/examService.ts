import { ExamType } from "../controllers/examController.js";
import { createExam, getCategory } from "../repositories/examRepository.js";

const create =async (exam:ExamType) => {
    await checkCategory(exam.categoryId)
    await checkDiscipline(exam.disciplineId)
    await checkInstructor(exam.instructorId)

    await createExam(exam)

    return 
}

const checkCategory =async (categoryId:number) => {
    const category = await getCategory(categoryId);
    if (!category) throw {message: "Category does not exist", status: 400}
    return
}

const checkDiscipline =async (disciplineId:number) => {
    const discipline = await getCategory(disciplineId);
    if (!discipline) throw {message: "Discipline does not exist", status: 400}
    return
}

const checkInstructor =async (instructorId:number) => {
    const instructor = await getCategory(instructorId);
    if (!instructor) throw {message: "Instructor does not exist", status: 400}
    return
}

export {
    create,
}