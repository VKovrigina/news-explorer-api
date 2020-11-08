const supertest = require('supertest');
const mongoose = require('mongoose');
const app = require('../app');
const { loginErrorMesaage } = require('../utils/constants');
const { MONGO_TEST_ADDRESS } = require('../utils/config');
const fixtures = require('../fixtures');
const User = require('../models/user');

const request = supertest(app);

const {
  name,
  email,
  password,
  invalidEmail,
  shortPassword,
} = fixtures.user;

beforeAll(() => mongoose.connect(MONGO_TEST_ADDRESS, {
  useNewUrlParser: true,
  useCreateIndex: true,
  useFindAndModify: false,
  useUnifiedTopology: true,
}));

afterAll(() => mongoose.disconnect());

describe('Api test', () => {
  afterAll(() => User.deleteOne({ email: fixtures.user.email }));
  it('Возвращает ошибку и 401-й ответ по запросу, если пользователь не зарегистрирован', () => request.get('/none').then((res) => {
    expect(res.status).toBe(401);
    expect(res.body.message).toBe(loginErrorMesaage);
  }));
  it('Создает пользователя', () => request.post('/signup').send({
    name,
    email,
    password,
  }).then((res) => {
    expect(res.status).toBe(200);
  }));
  it('Возвращает ошибку при попытке создать пользователя, если не передано одно из полей', () => request.post('/signup').send({
    email,
    password,
  }).then((res) => {
    expect(res.status).toBe(400);
  }));
  it('Возвращает ошибку при попытке создать пользователя, при невалидном email', () => request.post('/signup').send({
    name,
    invalidEmail,
    password,
  }).then((res) => {
    expect(res.status).toBe(400);
  }));
  it('Возвращает ошибку при попытке создать пользователя, при коротком пароле', () => request.post('/signup').send({
    name,
    email,
    shortPassword,
  }).then((res) => {
    expect(res.status).toBe(400);
  }));
  it('Возвращает ошибку при аутентификации, если не передано одно из полей', () => request.post('/signin').send({
    password,
  }).then((res) => {
    expect(res.status).toBe(400);
  }));
  it('Возвращает токен в куках при аутентификации', () => request.post('/signin').send({
    email,
    password,
  }).then((res) => {
    expect(res.status).toBe(200);
  }));
});
