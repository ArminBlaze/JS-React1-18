import {} from 'constants/index.js'
import { normalizedComments } from 'fixtures.js';
import { commentsSelector } from 'selectors';
import { ADD_COMMENT } from 'constants/index.js'

const defaultComments = normalizedComments.reduce(
  (acc, comment) => ({ ...acc, [comment.id]: comment }),
  {}
)

export default (state, action) => {

  if (state === undefined) {
    // return defaultArticles;
    return defaultComments
  }

  const commentsState = commentsSelector(state);

  const { type } = action

  switch (type) {
    case ADD_COMMENT: {
      //тут код добавления к в объект комментов
      // id: {коммент}
      const rawComment = action.payload;

      const newComment = {
        id: rawComment.id,
        user: rawComment.user,
        text: rawComment.text
      }

      const newCommentObj = {};
      newCommentObj[newComment.id] = newComment;
      
      return Object.assign( {}, commentsState, newCommentObj)
    }

    default:
      return commentsState
  }
}