import { INCREMENT } from 'constants/index.js'
import { counterSelector } from 'selectors';

// export default (counterState = 0, action) => {
//   return action.type === INCREMENT ? counterState + 1 : counterState
// }


export default (state, action) => {
  if (state === undefined) {
    // return defaultArticles;
    return 0
  }

  const counterState = counterSelector(state);
  
  const { type } = action;

  switch (type) {
    case INCREMENT: {
      return counterState + 1
    }

    default: 
      return counterState;
  }
}