import { DELETE_ARTICLE, ADD_COMMENT, LOAD_ALL_ARTICLES, START, SUCCESS,  LOAD_ARTICLE, LOAD_COMMENTS } from 'constants/index.js'
import { arrToMap } from './utils';
import { Record } from 'immutable';


const ArticleRecord = Record({
  title: null,
  id: null,
  text: null,
  date: null,
  comments: [],
  loading: false,
  loaded: false,
  error: null,
  commentsLoading: false,
  commentsLoaded: false,
})

const ArticlesStateRecord = Record({
  data: arrToMap([], ArticleRecord),
  loading: false,
  loaded: false,
  error: null,
});

const defaultArticles = new ArticlesStateRecord();


export default (state, action) => {
  if (state === undefined) {
    return defaultArticles;
  }

  //state.articles.data
  const articlesState = state.articles;
  const { type, payload, response } = action;

  switch (type) {
    case DELETE_ARTICLE: {
      return articlesState.deleteIn(['data', payload.id])
    }

    case ADD_COMMENT: {
      //тут код добавления к статье коммента
      //важно, чтобы все объекты копировались, а не изменялись по ссылке (иммутабельность)
      const articleId = action.payload.articleId;
      const commentId = action.payload.id;

      return articlesState.updateIn(
        ['data', articleId, 'comments'],
        (comments) => comments.concat(commentId)
      )
    }


    case LOAD_ALL_ARTICLES + START: {
      return articlesState.set('loading', true);
    }
      
    case LOAD_ALL_ARTICLES + SUCCESS: {
      return articlesState
        .set('data', arrToMap(response, ArticleRecord))
        .set('loading', false)
        .set('loaded', true)
    }

    case LOAD_ARTICLE + START:
      return articlesState.setIn(['data', payload, 'loading'], true)

    case LOAD_ARTICLE + SUCCESS: {
      return articlesState
        .setIn(
          ['data', payload],
          new ArticleRecord(response)
        )
        .setIn(['data', payload, 'loaded'], true)
    }

    case LOAD_COMMENTS + START: {
      const articleId = payload;

      return articlesState.setIn(
        ['data', articleId, 'commentsLoading'],
        true)
    }

    case LOAD_COMMENTS + SUCCESS: {
      const articleId = payload;

      return articlesState
        .mergeIn(['data', articleId], {
          'commentsLoading': false,
          'commentsLoaded': true,
        })
          
    }

    default: 
      return articlesState;
  }
}