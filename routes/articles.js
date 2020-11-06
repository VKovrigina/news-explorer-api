const router = require('express').Router();
const { createArticle, getArticle, deleteArticleById } = require('../controllers/articles');

router.post('/', createArticle);
router.get('/', getArticle);
router.delete('/:articleId', deleteArticleById);

module.exports = {
  articlesRouter: router,
};
