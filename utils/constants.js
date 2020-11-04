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

module.exports = {
  limiter,
  errorServerMessage,
  notFoundRouteMessage,
  invalidLinkMessage,
  invalidEmailMessage,
  wrongEmailPasswordMessage,
};
