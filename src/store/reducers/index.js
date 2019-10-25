import updateArticles from './updateArticles';
import updateSelected from './updateSelected';


const reducer = (state, action) => {
  return {
    articles: updateArticles(state, action),
  }
}


export default reducer;