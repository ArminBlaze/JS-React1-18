
//{id, user, text}
export default	(store) => (next) => (action) => {
  console.log('Вызываю action: ', action)
  

  const comment = action.payload;
  const commentId = generateId(comment.articleId);
  console.log(commentId);

  comment.id = commentId;
  console.log(action);
  
  next(action);
}

// Math.random should be unique because of its seeding algorithm.
// Convert it to base 36 (numbers + letters), and grab the first 9 characters
// after the decimal.
function generateId(base) {
  return base + "#" + Math.random().toString(36).substr(2, 9); 
}