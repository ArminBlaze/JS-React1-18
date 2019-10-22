import { createStore } from 'redux';
import reducer from './reducers';
	
// const store = createStore();
const store = createStore(reducer);

export default store;