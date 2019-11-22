import {} from 'constants/index.js'
import { normalizedComments } from 'fixtures.js';
import { commentsSelector } from 'selectors';
import { ADD_COMMENT } from 'constants/index.js'
import {arrToMap} from './utils';

const defaultComments = arrToMap(normalizedComments);

export default (state, action) => {

  if (state === undefined) {
    // return defaultArticles;
    return defaultComments
  }

  const commentsState = commentsSelector(state);

  const { type } = action

  switch (type) {
    case ADD_COMMENT: {
      //тут код добавления в объект комментов
      // id: {коммент}
      const rawComment = action.payload;

      const newComment = {
        id: rawComment.id,
        user: rawComment.user,
        text: rawComment.text
      }

      return {
        ...commentsState,
        [rawComment.id]: newComment
      }
    }

    default:
      return commentsState
  }
}