import { DELETE_ARTICLE, INCREMENT, SELECT_ARTICLE, SELECT_DATE } from 'constants/index.js'

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