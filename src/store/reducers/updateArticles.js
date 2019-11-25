import { DELETE_ARTICLE, ADD_COMMENT } from 'constants/index.js'
import { normalizedArticles } from 'fixtures.js'
import { articlesSelector } from 'selectors';
import { arrToMap } from './utils';
import { Record } from 'immutable';

const ArticleRecord = Record({
  title: null,
  id: null,
  text: null,
  date: null,
  comments: [],
})

const defaultArticles = arrToMap(normalizedArticles, ArticleRecord);

export default (state, action) => {
  if (state === undefined) {
    return defaultArticles;
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

      return oldArticlesState.updateIn(
        [articleId, 'comments'],
        (comments) => comments.concat(commentId)
      )
    }

    default: 
      return oldArticlesState;
  }
}