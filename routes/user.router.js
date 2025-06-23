import express from "express";
import { userController } from "../controller/user.controller.js";
import { authCheckUser } from "../middleware/auth.middleware.js";

const userRouter = express.Router()

userRouter.get("/users/me",authCheckUser,userController.getMe)
userRouter.patch("/users/me",authCheckUser,userController.update)
userRouter.post("/health-records",authCheckUser,userController.healthRecord)

export default userRouter