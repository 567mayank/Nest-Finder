import { Router } from "express";
import verifyJwt from "../Middlewares/verifyJwt.middleware.js";
import upload from '../Middlewares/multer.middleware.js'
import {
  login,
  registerUser,
  logout,
  isLoggedin,
  updatePersonalInfo,
  userInfo,
  upadteUserAvatar,
  updateSocketId,
  removeSocketId,
  sendRequest
} from "../Controllers/user.contoller.js"

const router = Router()

router.route("/login").post(login)
router.route("/register").post(registerUser)
router.route("/logout").post(verifyJwt,logout)
router.route("/userInfo").get(verifyJwt,userInfo)
router.route("/isLoggedin").get(isLoggedin)
router.route("/updatePersonalInfo").patch(verifyJwt,updatePersonalInfo)
router.route("/updateAvatar").patch(verifyJwt,upload.single('avatar'),upadteUserAvatar)

router.route("/updateSocketId").put(verifyJwt,updateSocketId)
router.route("/removeSocketId").put(verifyJwt,removeSocketId)

router.route("/sendRequest/:ownerId").put(verifyJwt,sendRequest)

export default router