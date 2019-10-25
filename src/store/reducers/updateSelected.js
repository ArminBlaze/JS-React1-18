// import { SELECT_ARTICLE } from 'constants/index.js'
// import defaultArticles from 'fixtures.js'

// export default (state, action) => {
//   if (state === undefined) {
//     return defaultArticles;
//   }

//   const localState = state.articles;
//   const { type, payload } = action;

//   switch (type) {
//     case SELECT_ARTICLE: {
//       return localState.filter((article) => article.id !== payload.id)
//     }
    
//     default: 
//       return localState;
//   }
// }
