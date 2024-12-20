import {Router} from "express"
import { updateFav, userFavDetail, userFavourite } from "../Controllers/favourite.controller.js"
import verifyJwt from "../Middlewares/verifyJwt.middleware.js"

const router = Router()

router.route("/update/:propertyId").put(verifyJwt,updateFav)
router.route("/getUserFav").get(verifyJwt,userFavourite)
router.route("/getFavPropDetails").get(verifyJwt,userFavDetail)

export default router