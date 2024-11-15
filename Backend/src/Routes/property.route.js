import { Router } from "express";
import verifyJwt from "../Middlewares/verifyJwt.js"
// import { listProperty } from "../Controllers/user.contoller.js";
import { listProperty } from "../Controllers/property.controller.js";


const router = Router()

router.route("/listProperty").post(verifyJwt,listProperty)

export default router