import { DELETE_ARTICLE, ADD_COMMENT } from 'constants/index.js'
import { normalizedArticles } from 'fixtures.js'
import { articlesSelector } from 'selectors';

const defaultArticles = normalizedArticles.reduce(
  (acc, article) => ({ ...acc, [article.id]: article }),
  {}
)

export default (state, action) => {
  if (state === undefined) {
    // return defaultArticles;
    return defaultArticles
  }

  const localState = articlesSelector(state);
  const { type, payload } = action;

  switch (type) {
    case DELETE_ARTICLE: {
      return localState.filter((article) => article.id !== payload.id)
    }

    case ADD_COMMENT: {
      //тут код добавления к статье коммента
      const rawComment = action.payload;
      const articleId = rawComment.articleId;
      const commentId = rawComment.id;

      const oldArticle = localState[articleId];
      const newArticle = {...oldArticle};

      const oldComments = oldArticle.comments;
      
      const newComments = oldComments ? [...oldComments, commentId] : [commentId];

      newArticle.comments = newComments;

      const newState = {};
      newState[articleId] = newArticle;

      //взять старую статью. Её клонировать и записать в новый стате.
      return Object.assign( {}, localState, newState)
    }

    default: 
      return localState;
  }
}