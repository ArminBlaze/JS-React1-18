import { DELETE_ARTICLE, INCREMENT, SELECT_ARTICLE, SELECT_DATE, ADD_COMMENT, LOAD_ALL_ARTICLES, LOAD_ARTICLE } from 'constants/index.js'

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

export function loadArticleById(id) {
  return {
    type: LOAD_ARTICLE,
    payload: id,
    callApi: `/api/article/${id}`
  }
}