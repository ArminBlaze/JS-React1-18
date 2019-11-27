import { createStore, applyMiddleware, compose } from 'redux';
import logger from './middlewares/logger';
import api from './middlewares/api';
import commentIdGenerator from './middlewares/commentIdGenerator';
import thunk from 'redux-thunk';
	
import reducer from './reducers';

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
	
const store = createStore(reducer, enhancer);

window.store = store;

export default store;