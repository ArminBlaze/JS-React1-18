import { INCREMENT } from 'constants/index.js'

// export default (counterState = 0, action) => {
//   return action.type === INCREMENT ? counterState + 1 : counterState
// }


export default (state, action) => {
  if (state === undefined) {
    // return defaultArticles;
    return 0
  }

  const counterState = state;
  
  const { type } = action;

  switch (type) {
    case INCREMENT: {
      return counterState + 1
    }

    default: 
      return counterState;
  }
}