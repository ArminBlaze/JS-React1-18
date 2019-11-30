import { normalizedComments } from 'fixtures.js';
import { commentsSelector } from 'selectors';
import { ADD_COMMENT, START, SUCCESS, FAIL, LOAD_COMMENTS } from 'constants/index.js'
import { arrToMap } from './utils';
import { Record } from 'immutable';

const articleIdRecord = Record({
	articleId: null,
  data: [],
  loading: false,
  loaded: false,
  error: null,
})

// const defaultComments = new CommentsStateRecord();
const defaultComments = arrToMap([], articleIdRecord);

export default (state, action) => {

  if (state === undefined) {
    // return defaultArticles;
    return defaultComments
  }

  const commentsState = state.comments;
  const { type, payload, response } = action;


  switch (type) {
    case LOAD_COMMENTS + START: {
      debugger;

      const articleId = payload;

      return commentsState
              .set(articleId, new articleIdRecord(response))
              .setIn([articleId, 'loading'], true)
              .setIn([articleId, 'articleId'], articleId)
    }

    case LOAD_COMMENTS + SUCCESS: {
      const articleId = payload;
      debugger;

      return commentsState
        .setIn(
          [articleId, 'data'],
          arrToMap(response)
        )
        .setIn([articleId, 'loading'], false)
        .setIn([articleId, 'loaded'], true)
    }

    case ADD_COMMENT: {
      //тут код добавления в объект комментов
      // id: {коммент}
      const rawComment = payload;
      const randomId = rawComment.id;

      const newComment = {
        id: randomId,
        user: rawComment.user,
        text: rawComment.text
      }

      return commentsState.set(randomId, newComment);
    }

    default:
      return commentsState
  }
}