import { Router } from "express";
import {
  login,
  registerUser,
  logout,
  // listProperty,
  isLoggedin,
  updatePersonalInfo
} from "../Controllers/user.contoller.js"
import verifyJwt from "../Middlewares/verifyJwt.js";
const router = Router()

router.route("/login").post(login)
router.route("/register").post(registerUser)
router.route("/logout").post(verifyJwt,logout)
// router.route("/listProperty").post(verifyJwt,listProperty)
router.route("/isLoggedin").get(isLoggedin)
router.route("/updatePersonalInfo").patch(verifyJwt,updatePersonalInfo)

export default router