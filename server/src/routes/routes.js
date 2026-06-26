import express from 'express';
import { getBusData } from '../controller/busController.js';
import { healthCheck } from '../controller/appController.js'
import { apiLimiter } from '../middlware/rateLimiter.js';

const router = express.Router();

router.get('/bus/:id', apiLimiter, getBusData)
router.get('/health', healthCheck)

export default router;