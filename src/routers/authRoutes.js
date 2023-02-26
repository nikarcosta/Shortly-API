import { Router } from "express";
import { validateNewUser } from "../middlewares/signUpValidationMiddleware.js";
import { signUpSchema } from "../schemas/authSchema.js";
import { signUp } from "../controllers/signUpController.js";


const authRouter = Router();

authRouter.post("/signUp", validateNewUser, signUp);

export default authRouter;