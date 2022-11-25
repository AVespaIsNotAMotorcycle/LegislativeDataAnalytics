const supertest = require('supertest');
const http = require('http');
const app = require('../server');

const apptest = supertest(http.createServer(app));

/* Tests for methods defined in graphs.js */
const URL_PREFIX = '/graph-apis';
test(`GET ${URL_PREFIX}`, async () => {
  const expectedResponse = 'This route is for the graph data';
  await apptest.get(URL_PREFIX)
    .expect(200)
    .then((response) => {
      expect(response.text).toBe(expectedResponse);
    });
});

/* Tests for /representative-bills
 */
const REP_BILLS_URL = `${URL_PREFIX}/representative-bills`;
test(`GET ${REP_BILLS_URL} returns 500 on no date input`, async () => {
  await apptest.get(REP_BILLS_URL)
    .expect(500);
});
