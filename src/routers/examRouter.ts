import { Router } from "express";
import { validateSchema } from "../middlewares/validateSchema.js";
import validateToken from "../middlewares/authMiddleware.js"
import examSchema from "../schemas/examSchema.js";
import { create, get } from "../controllers/examController.js";

const examRouter = Router();

examRouter.post("/exam", validateToken , validateSchema(examSchema), create);
examRouter.get("/exams", validateToken ,get)

export default examRouter