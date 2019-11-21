import { DELETE_ARTICLE, ADD_COMMENT } from 'constants/index.js'
import { normalizedArticles } from 'fixtures.js'
import { articlesSelector } from 'selectors';

const defaultArticles = normalizedArticles.reduce(
  (acc, article) => ({ ...acc, [article.id]: article }),
  {}
)

export default (state, action) => {
  if (state === undefined) {
    return defaultArticles
  }

  const oldArticlesState = articlesSelector(state);
  const { type, payload } = action;

  switch (type) {
    case DELETE_ARTICLE: {
      const articlesCopy = {...oldArticlesState};
      delete articlesCopy[payload.id];
      return articlesCopy;
    }

    case ADD_COMMENT: {
      //тут код добавления к статье коммента
      //важно, чтобы все объекты копировались, а не изменялись по ссылке (иммутабельность)
      const articleId = action.payload.articleId;
      const commentId = action.payload.id;

      const oldArticle = oldArticlesState[articleId];

      const newArticle = {
        ...oldArticle,
        comments: (oldArticle.comments || []).concat(commentId)
      };

      return {
        ...oldArticlesState,
        [articleId]: newArticle
      }
    }

    default: 
      return oldArticlesState;
  }
}