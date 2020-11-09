const Article = require('../models/article');
const BadRequestError = require('../errors/BadRequestError');
const NotFoundError = require('../errors/NotFoundError');
const UnauthorizedError = require('../errors/UnauthorizedError');
const {
  deleteArticleMessage, deleteArticleErrorMessage, invalidId, notFoundArticleMessage,
} = require('../utils/constants');

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

module.exports.getArticle = (req, res, next) => {
  Article.find({ owner: req.user._id })
    .sort({ createdAt: -1 })
    .then((article) => {
      res
        .status(200)
        .send({ data: article });
    })
    .catch(next);
};

module.exports.deleteArticleById = (req, res, next) => {
  Article.findOne({ _id: req.params.articleId }).select('+owner')
    .orFail(new NotFoundError(notFoundArticleMessage))
    .then((article) => {
      if (article.owner.equals(req.user._id)) {
        article.remove();
        res
          .status(200)
          .send({ message: deleteArticleMessage });
      } else {
        throw new UnauthorizedError(deleteArticleErrorMessage);
      }
    })
    .catch((err) => {
      if (err.name === 'CastError') {
        throw new BadRequestError(invalidId);
      }
      throw err;
    })
    .catch(next);
};
