import { Router } from "express";
import {
  login,
  registerUser
} from "../Controllers/user.contoller.js"
const router = Router()

router.route("/login").post(login)
router.route("/register").post(registerUser)

export default router