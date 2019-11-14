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

  const articlesState = articlesSelector(state);
  const { type, payload } = action;

  switch (type) {
    case DELETE_ARTICLE: {
      const articlesCopy = {...articlesState};
      delete articlesCopy[payload.id];
      return articlesCopy;
    }

    case ADD_COMMENT: {
      //тут код добавления к статье коммента
      const articleId = action.payload.articleId;
      const commentId = action.payload.id;

      const oldArticle = articlesState[articleId];

      const newArticle = {
        ...oldArticle,
        comments: (oldArticle.comments || []).concat(commentId)
      };

      return {
        ...articlesState,
        [articleId]: newArticle
      }
    }

    default: 
      return articlesState;
  }
}