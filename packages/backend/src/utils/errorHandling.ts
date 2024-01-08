import { Response } from 'express';

export function handleServerError(res: Response, error: Error) {
  console.error('Error:', error);
  res.status(500).json({ error: 'Internal Server Error' });
}
