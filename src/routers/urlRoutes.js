import { Router } from "express";
import { authValidation } from "../middlewares/authMiddleware.js";
import { validateSchema } from "../middlewares/validateSchemaMiddleware.js";
import { urlSchema } from "../schemas/linkSchema.js";
import { shorten } from "../controllers/urlController.js";


const urlRouter = Router();

urlRouter.post("/urls/shorten", authValidation, validateSchema(urlSchema), shorten);

export default urlRouter;