import { ADD_COMMENT, START, SUCCESS, LOAD_COMMENTS } from 'constants/index.js'
import { arrToMap } from './utils';
import { Record, Map } from 'immutable';


// const commentsByIdRecord = Record({
// 	articleId: null,
//   data: new Map(),
// });

// const defaultComments = new CommentsStateRecord();

const defaultComments = new Map({});


export default (state, action) => {

  if (state === undefined) {
    return defaultComments
  }

  const commentsState = state.comments;
  const { type, payload, response } = action;


  switch (type) {
    case LOAD_COMMENTS + SUCCESS: {
      return commentsState.merge(arrToMap(response))
    }

    case ADD_COMMENT: {
      const rawComment = payload;
      const randomId = rawComment.id;

      const newComment = {
        id: randomId,
        user: rawComment.user,
        text: rawComment.text
      }

      return commentsState.merge(arrToMap([newComment]))
    }

    default:
      return commentsState
  }
}