import { START, SUCCESS, FAIL } from 'constants/index.js'


//мидлвар делает запрос к серверу, если есть action.callApi с адресом
export default store => next => action => {
  const { callApi, type, ...rest } = action;
  if(!callApi) return next(action);
  
  // fetch(callApi)
  //   .then(res => res.json())
  //   .then(response => next({ ...action, response }))

  next({ //сразу передаём событие START, чтобы начал крутится спиннер
    type: type + START,
    ...rest
  })
  
  fetch(callApi) //реагируем на получение данных или ошибку
    .then(res => res.json())
    .then(response => next({ 
      type: type + SUCCESS,
      response,
      ...rest,
    }))
    .catch(error => next({
      type: type + FAIL,
      error,
      ...rest,
    }))
}