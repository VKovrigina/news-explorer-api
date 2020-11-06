const rateLimit = require('express-rate-limit');

const limiter = rateLimit({
  windowMs: 10 * 60 * 1000,
  max: 150,
  message: 'Подозрительно много запросов отправляется  с вашего IP. Вы робот? Если нет, подождите 10 минут :)',
});

const errorServerMessage = 'На сервере произошла ошибка';
const notFoundRouteMessage = 'Запрашиваемый ресурс не найден';
const invalidLinkMessage = 'Невалидная ссылка';
const invalidEmailMessage = 'Неправильный формат почты';
const wrongEmailPasswordMessage = 'Неправильные почта или пароль';
const requiredNameMessage = 'Поле "name" должно быть заполнено';
const requiredPasswordMessage = 'Поле "password" должно быть заполнено и быть длиной не меньше 5 символов';
const requiredEmailMessage = 'Поле "email" должно быть заполнено';
const uniqueEmailMessage = 'Пользователь с таким email уже существует';
const minlengthNameMessage = 'Минимальная длина поля "name" - 2 символа';
const maxlengthNameMessage = 'Максимальная длина поля "name" - 30 символов';
const createUserMessage = 'Пользователь успешно создан!';
const loginMessage = 'Аутентификация прошла успешно';
const loginErrorMesaage = 'Необходима авторизация';
const deleteArticleMessage = 'Статья удалена';
const deleteArticleErrorMessage = 'Вы не можете удалить чужую статью';
const invalidId = 'Проверьте валидность идентификатора';
const notFoundArticleMessage = 'Упс! Запрашиваемая статья не найдена';

module.exports = {
  limiter,
  errorServerMessage,
  notFoundRouteMessage,
  invalidLinkMessage,
  invalidEmailMessage,
  wrongEmailPasswordMessage,
  requiredNameMessage,
  requiredPasswordMessage,
  requiredEmailMessage,
  uniqueEmailMessage,
  minlengthNameMessage,
  maxlengthNameMessage,
  createUserMessage,
  loginMessage,
  loginErrorMesaage,
  deleteArticleMessage,
  invalidId,
  deleteArticleErrorMessage,
  notFoundArticleMessage,
};
