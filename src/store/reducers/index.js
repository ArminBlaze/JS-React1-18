import updateArticles from './updateArticles';
import updateFilters from './updateFilters';
import updateCounter from './updateCounter';


const reducer = (state, action) => {
  return {
    counter: updateCounter(state, action),
    articles: updateArticles(state, action),
    filters: updateFilters(state, action),
  }
}


export default reducer;