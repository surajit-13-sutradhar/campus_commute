import express from "express"
import {searchVehicles} from "../controllers/vehicleController.js"
const router = express.Router()

router.get("/search", searchVehicles)


module.exports = router