import {Router} from "express"
import { updateFav, userFavourite } from "../Controllers/favourite.controller.js"
import verifyJwt from "../Middlewares/verifyJwt.js"

const router = Router()

router.route("/update/:propertyId").put(verifyJwt,updateFav)
router.route("/getUserFav").get(verifyJwt,userFavourite)

export default router