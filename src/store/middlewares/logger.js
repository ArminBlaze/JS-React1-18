
export default	(store) => (next) => (action) => {
  console.log('Вызываю action: ', action)
  next(action);
}