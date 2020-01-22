import { ADD_COMMENT, START, SUCCESS, LOAD_COMMENTS, LOAD_COMMENTS_BY_PAGE } from 'constants/index.js'
import { arrToMap } from './utils';
import { Record, Map } from 'immutable';


// const commentsByIdRecord = Record({
// 	articleId: null,
//   data: new Map(),
// });

// const defaultComments = new CommentsStateRecord();

const CommentsStateRecord = Record({
  data: new Map({}),
  pageMap: new Map({}),
  totalComments: 0,
  commentsPerPage: 5,
});

const PageRecord = Record({
  id: null,
  loading: false,
  loaded: false,
  error: null,
  ids: [],
});

const defaultComments = new CommentsStateRecord();

// const defaultComments = new Map({});


export default (state, action) => {

  if (state === undefined) {
    return defaultComments
  }

  const commentsState = state;
  const { type, payload, response } = action;


  switch (type) {
    case LOAD_COMMENTS + SUCCESS: {
      return commentsState.mergeIn(['data'], arrToMap(response))
    }

    case ADD_COMMENT: {
      const rawComment = payload;
      const randomId = rawComment.id;

      const newComment = {
        id: randomId,
        user: rawComment.user,
        text: rawComment.text
      }

      return commentsState.mergeIn(['data'], arrToMap([newComment]))
    }

    case LOAD_COMMENTS_BY_PAGE + START: {
      const pageNumber = payload+1;

      const newPage = new PageRecord({
        id: pageNumber,
        loading: true
      })

      return commentsState.mergeIn(['pageMap', pageNumber], newPage);
    }

    case LOAD_COMMENTS_BY_PAGE + SUCCESS: {

      const pageNumber = payload+1;

      console.log(response);
      const total = response.total;
      const comments = response.records;
      const ids = comments.map( comment => comment.id);

      return commentsState
        .set('totalComments', total)
        .mergeIn(['pageMap', pageNumber],
          {
            loading: false,
            loaded: true,
            ids: ids,
          })
        .mergeIn(['data'], arrToMap(comments))
    }

    default:
      return commentsState
  }
}