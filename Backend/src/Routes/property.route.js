import { Router } from "express";
import verifyJwt from "../Middlewares/verifyJwt.js"
import { 
  editBasicProperty,
  editDetails,
  listAllProperty, 
  listProperty, 
  listRentedProperty, 
  listSaleProperty, 
  listSingleProperty} from "../Controllers/property.controller.js";

const router = Router()

router.route("/listProperty").post(verifyJwt,listProperty)
router.route("/listAllProperty").get(listAllProperty)
router.route("/listSingleProperty/:propertyId").get(listSingleProperty)
router.route("/listRentedProperty").get(verifyJwt,listRentedProperty)
router.route("/listSaleProperty").get(verifyJwt,listSaleProperty)

router.route("/editBasicInfo/:propertyId").patch(verifyJwt,editBasicProperty)
router.route("/editDetailsInfo/:propertyId").patch(verifyJwt,editDetails)

export default router