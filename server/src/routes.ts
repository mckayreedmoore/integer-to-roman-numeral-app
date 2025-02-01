import express from 'express';
const router = express.Router();

import RomanNumeralController from './controllers/romanNumeralController';
const romanNumeralController = new RomanNumeralController();

router.get('/romannumeral', romanNumeralController.getRomanNumeral);

export default router;
