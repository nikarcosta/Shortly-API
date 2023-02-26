import { Router } from "express";
import { validateNewUser } from "../middlewares/signUpValidationMiddleware.js";
import { signUp } from "../controllers/signUpController.js";
import { validateSchema } from "../middlewares/validateSchemaMiddleware.js";
import { signInSchema } from "../schemas/authSchema.js";
import { signIn } from "../controllers/signInController.js";

const authRouter = Router();

authRouter.post("/signUp", validateNewUser, signUp);
authRouter.post("/signIn", validateSchema(signInSchema), signIn);

export default authRouter;