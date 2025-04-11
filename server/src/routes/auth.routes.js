import express from "express"
import multer from "multer"
import {signup, login, getMe} from "../controllers/authController.js"
import path from "path"
import auth from "../middlewares/auth.middleware.js"

const router = express.Router()

// Configure multer for file uploads
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'src/uploads/')
    },
    filename: function (req, file, cb) {
        const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9)
        cb(null, file.fieldname + '-' + uniqueSuffix + path.extname(file.originalname))
    }
})

const upload = multer({ 
    storage: storage,
    limits: {
        fileSize: 5 * 1024 * 1024 // 5MB limit
    },
    fileFilter: (req, file, cb) => {
        if (file.mimetype.startsWith('image/')) {
            cb(null, true)
        } else {
            cb(new Error('Only image files are allowed!'), false)
        }
    }
})

router.post("/signup", upload.single("idImage"), signup)
router.post("/login", login)
router.get("/me", auth, getMe)

export default router