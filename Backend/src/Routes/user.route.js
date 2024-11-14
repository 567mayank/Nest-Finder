import { Router } from "express";
import {
  login,
  registerUser,
  logout,
  listProperty
} from "../Controllers/user.contoller.js"
import verifyJwt from "../Middlewares/verifyJwt.js";
const router = Router()

router.route("/login").post(login)
router.route("/register").post(registerUser)
router.route("/logout",verifyJwt,logout)
router.post("/listProperty",verifyJwt,listProperty)

export default router