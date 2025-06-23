import express from "express";
import { docController } from "../controller/doc.controller.js";
import { authCheckDoc } from "../middleware/auth.middleware.js";

const docRouter = express.Router()

docRouter.get("/doctors/me",authCheckDoc,docController.getMe)
docRouter.patch("/doctors/me",authCheckDoc,docController.update)

export default docRouter