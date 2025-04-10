import express from "express"
import multer from "multer"
import {signup, login} from "../controllers/authController.js"

const router = express.Router()
const upload = multer({ dest: "src/uploads/" })

router.post("/signup", upload.single("idImage"), signup)
router.post("/login", login)

export default router