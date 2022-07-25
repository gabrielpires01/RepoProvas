import { Router } from "express";
import { create, login } from "../controllers/userController.js";
import { validateSchema } from "../middlewares/validateSchema.js";
import userSchema from "../schemas/userSchema.js";

const userRouter = Router();

userRouter.post("/signup", validateSchema(userSchema), create)
userRouter.post("/login", validateSchema(userSchema), login)

export default userRouter;