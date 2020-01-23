import updateArticles from './updateArticles';
import updateFilters from './updateFilters';
import updateCounter from './updateCounter';
import updateComments from './updateComments';
import { combineReducers } from 'redux'
import { connectRouter } from 'connected-react-router'

const reducer = (state, action) => {
  return {
    counter: updateCounter(state, action),
    articles: updateArticles(state, action),
    comments: updateComments(state, action),
    filters: updateFilters(state, action),
  }
}

const createRootReducer = (history) => {
  // const routerReducer = combineReducers({
  //   router: connectRouter(history),
  // })

  return (state, action) => {
    return {
      ...reducer(state, action),
      router: connectRouter(history)(state && state.router, action),
    }
  }
} 

export default createRootReducer