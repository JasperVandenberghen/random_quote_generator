import dotenv from 'dotenv';

dotenv.config();

export const apiKey = process.env.API_KEY;
export const port = process.env.API_PORT || 3000;