import request from 'supertest';
import app from './server';

const testPort = process.env.TEST_PORT || 3001;
let server: any;

describe('Server', () => {
  beforeAll((done) => {
    server = app.listen(testPort, () => {
      console.log(`Test server is running on http://localhost:${testPort}`);
      done();
    });
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  afterAll((done) => {
    server.close(done);
  });

  it('should initialize the server without errors', () => {
    expect(app).toBeDefined();
  });

  it('should include CORS middleware', async () => {
    const response = await request(app).get('/api/quotes/random');

    expect(response.header['access-control-allow-origin']).toBe('*');
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

  it('should handle limit query parameter', async () => {
    const response = await request(app).get('/api/quotes/random?limit=5');
  
    expect(response.status).toBe(200);
    expect(response.body).toHaveLength(5);
  });

  it('should handle minLength query parameter', async () => {
    const response = await request(app).get('/api/quotes/random?minLength=10');
    const quoteData = response.body[0];
    expect(response.status).toBe(200);
    expect(quoteData.content.length).toBeGreaterThanOrEqual(10);
    expect(quoteData.content.length).not.toBeLessThan(10);
  });
  
  it('should handle maxLength query parameter', async () => {
    const response = await request(app).get('/api/quotes/random?maxLength=50');
    const quoteData = response.body[0];
    expect(response.status).toBe(200);
    expect(quoteData.content.length).toBeLessThanOrEqual(50);
  });
  
  it('should handle tags query parameter', async () => {
    const response = await request(app).get('/api/quotes/random?tags=business');
    const quoteData = response.body[0];
    expect(response.status).toBe(200);
    expect(quoteData.tags).toContain("Business")
  });
  
  it('should handle author query parameter', async () => {
    const response = await request(app).get('/api/quotes/random?author=Jack Welch');
    const quoteData = response.body[0];
    expect(response.status).toBe(200);
    expect(quoteData.author).toEqual("Jack Welch")
  });

  it('should respond with status 200 and valid JSON data for GET request to /api/quotes/random', async () => {
    const mockQuoteData = {
      content: 'This is a test quote',
      author: 'Test Author',
      tags: ['test', 'quote'],
      authorSlug: 'test-author',
    };

    global.fetch = jest.fn().mockResolvedValueOnce({
      ok: true,
      json: async () => mockQuoteData,
    });

    const response = await request(app).get('/api/quotes/random');

    expect(response.status).toBe(200);
    expect(response.body).toEqual(mockQuoteData);
  });

  it('should respond with 500 if fetch failed', async () => {
    global.fetch = jest.fn().mockRejectedValueOnce(new Error('Fetch failed'));

    const response = await request(app).get('/api/quotes/random');
    expect(response.status).toBe(500);
    expect(response.serverError).toBe(true);
  });
});
