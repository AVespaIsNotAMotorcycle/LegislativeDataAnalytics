const supertest = require('supertest');
const http = require('http');
const app = require('./server');

const apptest = supertest(http.createServer(app));

test('GET /', async () => {
  const expectedResponse = 'This is the port with the DB API';
  await apptest.get('/')
    .expect(200)
    .then((response) => {
      expect(response.text).toBe(expectedResponse);
    });
});
