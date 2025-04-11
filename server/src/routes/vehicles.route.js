import express from "express"
import {searchVehicles} from "../controllers/vehicleController.js"
const router = express.Router()

router.get("/search", searchVehicles)


export default router