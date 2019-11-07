import { DELETE_ARTICLE } from 'constants/index.js'
import { normalizedArticles as defaultArticles } from 'fixtures.js'
import { articlesSelector } from 'selectors';

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

    default: 
      return localState;
  }
}