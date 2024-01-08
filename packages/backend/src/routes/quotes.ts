// src/routes/quotes.ts
import { Router, Request, Response } from 'express';
import { apiKey } from '../config/config';
const quotesRouter = Router();

quotesRouter.get('/random', async (req: Request, res: Response) => {
    try {
      console.log(`Incoming request for random quotes with limit: ${req.query.limit ?? 1}`);
  
      if (!apiKey) {
        throw new Error('API key is missing');
      }
  
      const limit = req.query.limit ?? 1;
  
      const response = await fetch(`https://api.quotable.io/quotes/random${limit ? `?limit=${limit}` : ''}`, {
        headers: {
          'Bearer': apiKey,
        },
      });
  
      if (!response.ok) {
        throw new Error(`Failed to fetch quote. Status: ${response.status}`);
      }
  
      const quote = await response.json();
  
      res.json(quote)
    } catch (error) {
      console.error('Error fetching quote:', error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  });

export default quotesRouter;
