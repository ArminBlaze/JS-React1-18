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
      const rawComment = action.payload;
      const articleId = rawComment.articleId;
      const commentId = rawComment.id;

      const oldArticle = articlesState[articleId];
      const newArticle = {...oldArticle};

      const oldComments = oldArticle.comments;
      
      const newComments = oldComments ? [...oldComments, commentId] : [commentId];

      newArticle.comments = newComments;

      const newState = {};
      newState[articleId] = newArticle;

      //взять старую статью. Её клонировать и записать в новый стате.
      return Object.assign( {}, articlesState, newState)
    }

    default: 
      return articlesState;
  }
}