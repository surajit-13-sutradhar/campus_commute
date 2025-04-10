import express from 'express'
import dotenv from 'dotenv'
import vehicleRoutes from './routes/vehicles.route.js'
import bookingRoutes from './routes/bookings.route.js'

dotenv.config()
const app = express()

const cors = require("cors");
app.use(cors());


app.use(express.json())
app.use("/uploads", express.static("src/uploads"))
app.use("/api/vehicles", vehicleRoutes)
app.use("/api/bookings", bookingRoutes)

app.use("/api/auth", authRoutes)

const PORT = process.env.PORT || 5000

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
