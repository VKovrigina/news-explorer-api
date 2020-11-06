const router = require('express').Router();
const { createArticle, getArticle } = require('../controllers/articles');

router.post('/', createArticle);
router.get('/', getArticle);

module.exports = {
  articlesRouter: router,
};
