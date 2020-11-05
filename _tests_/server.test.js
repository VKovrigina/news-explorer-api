const supertest = require('supertest');
const app = require('../app');
const { notFoundRouteMessage } = require('../utils/constants');

const request = supertest(app);

it('Возвращает ошибку и 404-й ответ по запросу на несуществующий эндпоинт', () => request.get('/none').then((res) => {
  expect(res.status).toBe(404);
  expect(res.body.message).toBe(notFoundRouteMessage);
}));
