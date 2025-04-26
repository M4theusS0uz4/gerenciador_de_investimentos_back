import { createInvestment } from '../controllers/investmentController.js'
import express from 'express'

const router = express.Router();

router.post('/createInvestment', createInvestment);

export default router;