import { Router } from "express";
import { loginController } from "../controllers/auth.controllers";
const authRouter = Router()

authRouter.route("/login")
    .post(loginController)

export default authRouter