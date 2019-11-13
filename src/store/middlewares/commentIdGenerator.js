import { ADD_COMMENT } from 'constants/index.js'


//{id, user, text}
export default	(store) => (next) => (action) => {
  if(action.type !== ADD_COMMENT) {
    next(action);
    return;
  }

  console.log('Буду генерировать ID: ', action)
  
  const comment = action.payload;
  const commentId = generateId();
  console.log(commentId);

  comment.id = commentId;
  console.log(action);
  
  next(action);
}

// Math.random should be unique because of its seeding algorithm.
// Convert it to base 36 (numbers + letters), and grab the first 9 characters
// after the decimal.
function generateId() {
  return Date.now().toString(36) + "#" + Math.random().toString(36).substr(2, 9); 
}