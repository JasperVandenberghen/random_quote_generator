import request from 'supertest';
import app from './server';

const testPort = 3001;
let server: any;

describe('Express App Tests', () => {
  beforeAll((done) => {
    server = app.listen(testPort, () => {
      console.log(`Test server is running on http://localhost:${testPort}`);
      done();
    });
  });

  afterAll((done) => {
    server.close(done);
  });

  it('should respond with status 200 for GET request to /api/quotes/random', async () => {
    const response = await request(app).get('/api/quotes/random');
    const quoteData = response.body[0];
    expect(response.status).toBe(200);
    expect(quoteData.content).toBeDefined();
    expect(quoteData.author).toBeDefined();
    expect(quoteData.tags).toBeDefined();
    expect(quoteData.authorSlug).toBeDefined();
  });
});
