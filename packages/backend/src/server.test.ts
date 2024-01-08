import request from 'supertest';
import express from 'express';

const testApp = express();

const testPort = 3001;
let server: any;

beforeEach(async () => {
  server = testApp.listen(testPort, () => {
    console.log(`Test server is running on http://localhost:${testPort}`);
  });
});

// afterAll(async () => {
//   server.close(() => {
//     console.log('Test server closed.');
//   });
// });

describe('Express App Tests', () => {
  it('should respond with status 200 for GET request to /api/quotes', async () => {
    const response = await request(testApp).get('/api/quotes');
    expect(response.status).toBe(200);
  });
});
