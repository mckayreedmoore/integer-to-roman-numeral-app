import { Request, Response } from 'express';
import logger from '../utils/logger';

import RomanNumeralService from '../services/romanNumeralService';
const romanNumeralService = new RomanNumeralService();

export default class RomanNumeralController {
  async getRomanNumeral(req: Request, res: Response): Promise<void> {
    try {
      const data = req.query.query as string;

      if (!data || isNaN(Number(data))) {
        logger.info(`Invalid input recieved: ${data}`);
        res.status(400).json({ error: 'Input invalid. Submit number between 1 and 3999.' });
        return;
      }

      const number = Number(data);
      if (number < 1 || number > 3999) {
        logger.info(`Input out of range received: ${number}`);
        res.status(400).json({ error: 'Number outside of range. Please select number between 1 and 3999' });
        return;
      }

      logger.info(`Processing conversion of number ${number}`);
      const result = romanNumeralService.convertToRoman(number);
      logger.info(`Roman numeral conversion completed. Input: ${number} Output: ${result}`);

      res.send({
        input: data,
        output: result,
      });
    } catch (error: any) {
      logger.error(`Error: ${error.message} Stack:${error.stack}`);
      res.status(500).json({ error: 'Internal server error.' });
    }
  }
}
