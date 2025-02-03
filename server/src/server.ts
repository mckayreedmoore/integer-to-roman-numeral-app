import express from 'express';
import helmet from 'helmet';
import cors from 'cors';
import router from './routes';
import logger from './utils/logger';
import dotenv from 'dotenv';

dotenv.config();

const port = process.env.PORT;
const app = express();

// sets various http headers for improved security
app.use(helmet());

// default allow all state. Additional configuration required for production
app.use(cors());

app.use('/', router);

app.listen(port, () => {
  logger.info(`App listening on port ${port}`);
});

export default app;
