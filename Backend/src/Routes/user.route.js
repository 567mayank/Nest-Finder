import { Router } from "express";
import {
  login,
  registerUser,
  logout
} from "../Controllers/user.contoller.js"
import verifyJwt from "../Middlewares/verifyJwt.js";
const router = Router()

router.route("/login").post(login)
router.route("/register").post(registerUser)
router.route("/logout",verifyJwt,logout)

export default router