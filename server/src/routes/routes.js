import express from 'express';
import { getBusData } from '../controller/busController.js';

const router = express.Router();

router.post('/bus/:id', getBusData)

export default router;