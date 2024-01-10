import express from 'express';
import quotesRouter from './routes/quotes';
import cors from 'cors';
import { port } from './config/config';

const app = express();

// Using the cors middleware to enable Cross-Origin Resource Sharing
app.use(cors());
// Using the quotesRouter for handling routes starting with '/api/quotes'
app.use('/api/quotes', quotesRouter);

if (process.env.NODE_ENV !== 'test') {
  // Starting the server and logging the server address to the console
  app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
  });
}

export default app;
