import { DELETE_ARTICLE, INCREMENT, SELECT_ARTICLE, SELECT_DATE, ADD_COMMENT, LOAD_ALL_ARTICLES, LOAD_ARTICLE, START, SUCCESS, FAIL, LOAD_COMMENTS, LOAD_COMMENTS_BY_PAGE } from 'constants/index.js'
import {push} from 'connected-react-router';

export function increment() {
  return {
    type: INCREMENT
  }
}

export function deleteArticle(id) {
  return {
    type: DELETE_ARTICLE,
    payload: { id }
  }
}

export function selectArticle(id) {
  return {
    type: SELECT_ARTICLE,
    payload: id 
  }
}

export function selectDate(range) {
  return {
    type: SELECT_DATE,
    payload: range
  }
}

export function addComment(comment) {
  return {
    type: ADD_COMMENT,
    generateId: true,
    payload: comment 
  }
}

export function loadAllArticles() {
  return {
    type: LOAD_ALL_ARTICLES,
    callApi: '/api/article'
  }
}

// api-middleware version
// export function loadArticleById(id) {
//   return {
//     type: LOAD_ARTICLE,
//     payload: id,
//     callApi: `/api/article/${id}`
//   }
// }

// thunk version
export function loadArticleById(id) {
  return (dispatch) => {
    dispatch({
      type: LOAD_ARTICLE + START,
      payload: id
    })
    
    fetch(`/api/article/${id}`)
      .then(res => {
        if(res.status >= 400) throw new Error(res.statusText)
        return res.json()
      }) 
      .then(response => dispatch({
        type: LOAD_ARTICLE + SUCCESS,
        payload: id,
        response
      }))
      .catch(error => {
        dispatch({
          type: LOAD_ARTICLE + FAIL,
          payload: id,
          error
        })
        
        dispatch(push('/error') );
      })
  }
}

export function loadCommentsById(articleId) {
  return (dispatch) => {
    dispatch({
      type: LOAD_COMMENTS + START,
      payload: articleId
    })
    
    fetch(`/api/comment?article=${articleId}`)
      .then(res => res.json())
      .then(response => dispatch({
        type: LOAD_COMMENTS + SUCCESS,
        payload: articleId,
        response
      }))
      .catch(error => dispatch({
        type: LOAD_COMMENTS + FAIL,
        payload: articleId,
        error
      }))
  }
}

export function loadCommentsByPage(page) {
  return (dispatch) => {
    dispatch({
      type: LOAD_COMMENTS_BY_PAGE + START,
      payload: page
    })

    const limit = 5;
    const offset = page*limit;
    
    fetch(`/api/comment?limit=5&offset=${offset}`)
      .then(res => res.json())
      .then(response => dispatch({
        type: LOAD_COMMENTS_BY_PAGE + SUCCESS,
        payload: page,
        response
      }))
      .catch(error => dispatch({
        type: LOAD_COMMENTS_BY_PAGE + FAIL,
        payload: page,
        error
      }))
  }
}