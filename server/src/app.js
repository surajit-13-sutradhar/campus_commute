import express from "express"
import userRoutes from "./routes/user"

const app = express()
app.use(express.json())

app.use("/api/user", userRoutes)

export default app