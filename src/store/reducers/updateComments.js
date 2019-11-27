import { normalizedComments } from 'fixtures.js';
import { commentsSelector } from 'selectors';
import { ADD_COMMENT, START, SUCCESS, FAIL } from 'constants/index.js'
import { arrToMap } from './utils';

const defaultComments = arrToMap(normalizedComments);

export default (state, action) => {

  if (state === undefined) {
    // return defaultArticles;
    return defaultComments
  }

  const oldCommentsState = state.comments;

  const { type } = action

  switch (type) {
    case ADD_COMMENT: {
      //тут код добавления в объект комментов
      // id: {коммент}
      const rawComment = action.payload;
      const randomId = rawComment.id;

      const newComment = {
        id: randomId,
        user: rawComment.user,
        text: rawComment.text
      }

      return oldCommentsState.set(randomId, newComment);
    }

    default:
      return oldCommentsState
  }
}