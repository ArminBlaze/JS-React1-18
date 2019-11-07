import updateArticles from './updateArticles';
import updateFilters from './updateFilters';
import updateCounter from './updateCounter';
import updateComments from './updateComments';


const reducer = (state, action) => {
  return {
    counter: updateCounter(state, action),
    articles: updateArticles(state, action),
    comments: updateComments(state, action),
    filters: updateFilters(state, action),
  }
}


export default reducer;