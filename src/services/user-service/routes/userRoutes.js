import { Router } from "express";
import { profile, changePassword } from '../controllers/userController.js';

const router = Router();

router.get('/profile', profile); 
router.post('/changePassword', changePassword)

export default router;
