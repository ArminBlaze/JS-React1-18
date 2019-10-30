import updateArticles from './updateArticles';
import updateFilters from './updateFilters';


const reducer = (state, action) => {
  return {
    articles: updateArticles(state, action),
    filters: updateFilters(state, action),
  }
}


export default reducer;