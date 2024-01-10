import { Router, Request, Response } from 'express';
import { apiKey } from '../config/config';
const quotesRouter = Router();

quotesRouter.get('/random', async (req: Request, res: Response) => {
    try {
      console.log(`Incoming request for random quotes with limit: ${req.query.limit ?? 1}`);
  
      if (!apiKey) {
        throw new Error('API key is missing');
      }
  
      const queryParams = new URLSearchParams();

       // Setting optional query parameters if provided in the reques
      if (req.query.limit !== undefined) {
        queryParams.set('limit', req.query.limit.toString());
      }

      if (req.query.minLength !== undefined) {
        queryParams.set('minLength', req.query.minLength.toString());
      }

      if (req.query.maxLength !== undefined) {
        queryParams.set('maxLength', req.query.maxLength.toString());
      }

      if (req.query.tags !== undefined) {
        queryParams.set('tags', req.query.tags.toString());
      }

      if (req.query.author !== undefined) {
        queryParams.set('author', req.query.author.toString());
      }

      const apiUrl = `https://api.quotable.io/quotes/random${queryParams.toString() !== '' ? `?${queryParams.toString()}` : ''}`;

      const response = await fetch(apiUrl, {
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
