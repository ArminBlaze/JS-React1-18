import { ADD_COMMENT, START, SUCCESS, LOAD_COMMENTS } from 'constants/index.js'
import { arrToMap } from './utils';
import { Record, Map } from 'immutable';


const commentsByIdRecord = Record({
	articleId: null,
  data: new Map(),
  loading: true,
  loaded: false,
  error: null,
});

// const defaultComments = new CommentsStateRecord();
// const defaultComments = arrToMap([], commentsByIdRecord);

const defaultComments = new Map({});


export default (state, action) => {

  if (state === undefined) {
    return defaultComments
  }

  const commentsState = state.comments;
  const { type, payload, response } = action;


  switch (type) {
    case LOAD_COMMENTS + START: {
      const articleId = payload;

      let newState = initArticleRecord(articleId, commentsState);

      return newState
    }

    case LOAD_COMMENTS + SUCCESS: {
      const articleId = payload;

      return commentsState
        .mergeIn(
          [articleId, 'data'],
          arrToMap(response)
        )
        .setIn([articleId, 'loading'], false)
        .setIn([articleId, 'loaded'], true)
    }


    // commentsState = Map {articleId: commentsByIdRecord}
    // commentsByIdRecord.data = Map {commentId: commentObj}
    case ADD_COMMENT: {
      const rawComment = payload;
      const randomId = rawComment.id;
      const articleId = rawComment.articleId;
      

      const newComment = {
        id: randomId,
        user: rawComment.user,
        text: rawComment.text
      }

      let newState = initArticleRecord(articleId, commentsState);

      return newState.setIn([articleId, 'data', randomId], newComment)
    }

    default:
      return commentsState
  }
}


//До загрузки комментариев у нас не создана Record для этой статьи
function initArticleRecord(articleId, commentsState) {
  //если нет записи для этой статьи - создаём
  if(!commentsState.has(articleId)) {
    return commentsState.set(articleId, new commentsByIdRecord({articleId}))
  }
  else {
    return commentsState;
  }
}