import dotenv from 'dotenv';

// Loading environment variables from the .env file
dotenv.config();

export const apiKey = process.env.API_KEY;
export const port = process.env.API_PORT || 3000;