import {} from 'constants/index.js'
import { normalizedComments } from 'fixtures.js';
import { commentsSelector } from 'selectors';

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
    default:
      return commentsState
  }
}