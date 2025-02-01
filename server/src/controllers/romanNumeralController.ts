import { Request, Response } from 'express';

import RomanNumeralService from '../services/romanNumeralService';
const romanNumeralService = new RomanNumeralService();

export default class RomanNumeralController {
  async getRomanNumeral(req: Request, res: Response): Promise<void> { 
    try {
      const data = req.query.query as string;

      if (!data || isNaN(Number(data))) {
        res.status(400).json({error: 'Input invalid. Submit number between 1 and 3999.'});
        return;
      }

      const number = Number(data);
      if (number < 1 || number > 3999) {
        res.status(400).json({error: 'Number outside of range. Please select number between 1 and 3999'});
        return;
      }

      const result = romanNumeralService.convertToRoman(number);

      res.send({
        input: data,
        output: result,
      });
    } catch (error) {
      res.status(500).json({error: 'Internal server error.'});
    }
  }
}