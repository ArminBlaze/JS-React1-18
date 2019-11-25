
//мидлвар делает запрос к серверу, если есть action.callApi с адресом
export default store => next => action => {
  const { callApi } = action;
  if(!callApi) return next(action);
  
  fetch(callApi)
    .then(res => res.json())
    .then(response => next({ ...action, response }))
}