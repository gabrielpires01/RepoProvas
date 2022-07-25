import Joi from "joi";
import { ExamType } from "../controllers/examController";

const examSchema = Joi.object<ExamType>({
    name: Joi.string().required(),
    link: Joi.string().pattern(/\.pdf$/).required(),
    categoryId: Joi.number().required(),
    disciplineId: Joi.number().required(),
    instructorId: Joi.number().required()
})

export default examSchema