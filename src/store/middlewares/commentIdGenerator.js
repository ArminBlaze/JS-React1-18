
//{id, user, text}
export default	(store) => (next) => (action) => {
  if(!action.generateId) {
    return next(action);
  }

  console.log('Буду генерировать ID: ', action)
  
  const comment = {...action.payload};
  const commentId = generateId();

  comment.id = commentId;
  
  next({
    ...action,
    payload: comment,
  });
}

// Math.random should be unique because of its seeding algorithm.
// Convert it to base 36 (numbers + letters), and grab the first 9 characters
// after the decimal.
function generateId() {
  return Date.now().toString(36) + "#" + Math.random().toString(36).substr(2, 9); 
}