const router = require('express').Router();
const { createArticle, getArticle, deleteArticleById } = require('../controllers/articles');
const { validateCreateArticle, validateArticleId } = require('../middlewares/requestValidation');

router.post('/', validateCreateArticle, createArticle);
router.get('/', getArticle);
router.delete('/:articleId', validateArticleId, deleteArticleById);

module.exports = {
  articlesRouter: router,
};
