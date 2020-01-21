import { createStore, applyMiddleware, compose } from 'redux';
import logger from './middlewares/logger';
import api from './middlewares/api';
import commentIdGenerator from './middlewares/commentIdGenerator';
import thunk from 'redux-thunk';
import { connectRouter } from 'connected-react-router'
import history from '../history.js'
	
import createRootReducer from './reducers';
// import reducer from './reducers';

// const enhancer = applyMiddleware(logger);

const composeEnhancers =
typeof window === 'object' &&
window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ ?   
  window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__({
    // Specify extension’s options like name, actionsBlacklist, actionsCreators, serialize...
  }) : compose;

const enhancer = composeEnhancers(
applyMiddleware(thunk, commentIdGenerator, api, logger),
// other store enhancers if any
);

// const historyReducer = connectRouter(history)(reducer);
// const store = createStore(historyReducer, enhancer);
// const historyReducer = connectRouter(history)(reducer);
const store = createStore(createRootReducer(history), enhancer)

window.store = store;

export default store;