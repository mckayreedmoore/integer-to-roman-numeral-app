import express from 'express';
import helmet from 'helmet';
import router from './routes';

const port = 8080;
const app = express();

app.use(helmet());

app.use('/', router);

app.listen(port, () => {
  console.log(`App listening on port ${port}`);
});
