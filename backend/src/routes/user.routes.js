import {Router} from 'express';
import { verifyJWT } from '../middlewares/auth.middleware.js';
import { register, login, getProfile, logoutUser } from '../controllers/user.controller.js';

const router = Router()

router.post("/register", register);
router.post("/login", login);
router.get("/profile", verifyJWT, getProfile);
router.post("/logout", verifyJWT, logoutUser);



export default router 