import express from 'express';
import quotesRouter from './routes/quotes';
import cors from 'cors';
import { port } from './config/config';

const app = express();

app.use(cors());
app.use('/api/quotes', quotesRouter);

if (process.env.NODE_ENV !== 'test') {
  app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
  });
}

export default app;
