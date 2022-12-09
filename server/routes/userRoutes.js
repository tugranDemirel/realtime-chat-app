import express from "express";
import {login, register, setAvatar} from "../controllers/userController.js";


const router = express.Router();

router.post('/register', register)
router.post('/login', login)
router.post('/setAvatar/:id', setAvatar)
export default router;