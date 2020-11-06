const Article = require('../models/article');
const BadRequestError = require('../errors/BadRequestError');
const NotFoundError = require('../errors/NotFoundError');
const UnauthorizedError = require('../errors/UnauthorizedError');

module.exports.createArticle = (req, res, next) => {
  const {
    keyword,
    title,
    text,
    date,
    source,
    link,
    image,
  } = req.body;

  Article.create({
    keyword,
    title,
    text,
    date,
    source,
    link,
    image,
    owner: req.user._id,
  })
    .then((article) => {
      res
        .status(200)
        .send({ data: { _id: article._id } });
    })
    .catch((err) => {
      if (err.name === 'ValidationError') {
        throw new BadRequestError(`${Object.values(err.errors).map((error) => error.message).join(', ')}`);
      }
      throw err;
    })
    .catch(next);
};

module.exports.getCards = (req, res, next) => {
  Article.find({})
    .sort({ createdAt: -1 })
    .populate(['owner', 'likes'])
    .then((cards) => {
      res
        .status(200)
        .send({ data: cards });
    })
    .catch(next);
};

module.exports.deleteCardById = (req, res, next) => {
  Article.findOne({ _id: req.params.id })
    .orFail(new NotFoundError('Упс! Запрашиваемая карточка не найдена'))
    .then((card) => {
      if (card.owner._id.equals(req.user._id)) {
        card.remove();
        res
          .status(200)
          .send({ message: 'Карточка удалена.' });
      } else {
        throw new UnauthorizedError('Вы не можете удалить чужую карточку, как бы она вам не нравилась..');
      }
    })
    .catch((err) => {
      if (err.name === 'CastError') {
        throw new BadRequestError('Проверьте валидность идентификатора');
      }
      throw err;
    })
    .catch(next);
};
