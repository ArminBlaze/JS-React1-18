import { DELETE_ARTICLE, ADD_COMMENT } from 'constants/index.js'
import { normalizedArticles } from 'fixtures.js'
import { articlesSelector } from 'selectors';
import {arrToMap} from './utils';
import {Map} from 'immutable';

const defaultArticles = arrToMap(normalizedArticles);

export default (state, action) => {
  if (state === undefined) {
    return new Map(defaultArticles)
  }

  const oldArticlesState = articlesSelector(state);
  const { type, payload } = action;

  switch (type) {
    case DELETE_ARTICLE: {
      return oldArticlesState.delete(payload.id)
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