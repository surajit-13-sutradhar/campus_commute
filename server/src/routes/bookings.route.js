import express from "express"
import auth from "../middlewares/auth.middleware.js"
import { createBooking, getUserBookings } from "../controllers/bookingController.js"
import { createBulkBooking, getBookings, getUserBulkBookings } from "../controllers/bulkBookingController.js"

const router = express.Router()
router.post("/", auth, createBooking)
router.get("/user", auth, getUserBookings)
router.post("/bulk", auth, createBulkBooking)
router.get("/bulk", auth, getUserBulkBookings)
router.get("/", auth, getBookings)

export default router