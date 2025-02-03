import express from 'express';
import helmet from 'helmet';
import cors from 'cors';
import router from './routes';
import logger from './utils/logger';
import dotenv from 'dotenv';

dotenv.config();

const port = 8080;
const app = express();

// sets various http headers for improved security
app.use(helmet());

app.use(
  cors({
    origin: process.env.ORIGIN || 'http://localhost:3000',
  })
);

app.use('/', router);

app.listen(port, () => {
  logger.info(`App listening on port ${port}`);
});

export default app;
