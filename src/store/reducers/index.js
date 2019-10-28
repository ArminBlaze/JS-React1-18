import updateArticles from './updateArticles';


const reducer = (state, action) => {
  return {
    articles: updateArticles(state, action),
  }
}


export default reducer;