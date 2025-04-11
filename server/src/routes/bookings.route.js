import express from "express"
import auth from "../middlewares/auth.middleware.js"
import createBooking from "../controllers/bookingController.js"

const router = express.Router()
router.post("/", auth, createBooking)

export default router