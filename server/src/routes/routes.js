import express from 'express';
import { getBusData } from '../controller/busController.js';
import { healthCheck } from '../controller/appController.js'

const router = express.Router();

router.get('/bus/:id', getBusData)
router.get('/health', healthCheck)

export default router;