import { Router } from "express";
import verifyJwt from "../Middlewares/verifyJwt.js"
import { 
  listAllProperty, 
  listProperty, 
  listRentedProperty, 
  listSaleProperty } from "../Controllers/property.controller.js";

const router = Router()

router.route("/listProperty").post(verifyJwt,listProperty)
router.route("/listAllProperty").get(listAllProperty)
router.route("/listRentedProperty").get(verifyJwt,listRentedProperty)
router.route("/listSaleProperty").get(verifyJwt,listSaleProperty)

export default router