import express from "express";
import { authControllerUser, authControllerDoc } from "../controller/auth.controller.js";
import { validator } from "../validations/validators.js";

const authRouter = express.Router();

authRouter.post("/register/user",validator.validate(validator.registerSchemaUser), authControllerUser.register);
authRouter.post("/register/doctor",validator.validate(validator.registerSchemaDoc), authControllerDoc.register);
authRouter.post("/login/user",validator.validate(validator.loginSchema), authControllerUser.login);
authRouter.post("/login/doctor",validator.validate(validator.loginSchema), authControllerDoc.login);

export default authRouter;
