import { Router } from "express";
import { authValidation } from "../middlewares/authenticationValidationMiddleware.js";
import { validateSchema } from "../middlewares/validateSchemaMiddleware.js";
import { urlSchema } from "../schemas/linkSchema.js";
import { shorten } from "../controllers/urlController.js";
import { getUrlById } from "../controllers/urlController.js";
import { openShortUrl } from "../controllers/urlController.js";
import { deleteUrl } from "../controllers/urlController.js";
import { getUser } from "../controllers/urlController.js";

const urlRouter = Router();

urlRouter.post("/urls/shorten", authValidation, validateSchema(urlSchema), shorten);
urlRouter.get("/urls/:id", getUrlById);
urlRouter.get("/urls/open/:shortUrl", openShortUrl);
urlRouter.delete("/urls/:id", authValidation, deleteUrl);
urlRouter.get("/users/me", authValidation, getUser);

export default urlRouter;