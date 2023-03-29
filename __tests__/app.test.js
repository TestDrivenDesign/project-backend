const request = require('supertest');
const app = require('../app');
const seed = require('../db/seeds/seed');
const testData = require('../db/data/test-data/');
const connection = require('../db/connection');


beforeEach(() => {
  return seed(testData);
});

afterAll(() => {
  connection.end();
});

describe('app', () => {
  describe('Server Error - bad path', () => {
    it('404: GET responds with not found error, if incorrect path given', () => {
      return request(app)
        .get('/api/badPath')
        .expect(404)
        .then(({ body }) => {
          expect(body.msg).toBe('Path not found');
        });
    });
  });


  describe('/api', () => {
    it('200: GET responds with json file with all /api endpoints', () => {
      return request(app)
        .get('/api')
        .expect(200)
        .then(({ body }) => {
          const jsonKeys = Object.keys(body);
          const jsonValues = Object.values(body);

          expect(jsonKeys.includes('GET /api/articles')).toBe(true);
          expect(jsonValues).toHaveLength(6);
          jsonValues.forEach(element => {
            expect(element.hasOwnProperty('description')).toBe(true);
          });

        });
    });
  });
});