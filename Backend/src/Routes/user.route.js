import { Router } from "express";
import verifyJwt from "../Middlewares/verifyJwt.js";
import {
  login,
  registerUser,
  logout,
  isLoggedin,
  updatePersonalInfo
} from "../Controllers/user.contoller.js"

const router = Router()

router.route("/login").post(login)
router.route("/register").post(registerUser)
router.route("/logout").post(verifyJwt,logout)
router.route("/isLoggedin").get(isLoggedin)
router.route("/updatePersonalInfo").patch(verifyJwt,updatePersonalInfo)

export default router