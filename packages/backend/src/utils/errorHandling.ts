import { Response } from 'express';

export function handleServerError(res: Response, error: Error) {
  // Logging the error to the console for debugging purposes
  console.error('Error:', error);
  // Sending a 500 Internal Server Error response with a JSON payload
  res.status(500).json({ error: 'Internal Server Error' });
}
