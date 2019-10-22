import React from 'react'
import ReactDOM from 'react-dom'
import App from './app'
// import store from './store/index';
import { Provider } from 'react-redux';


import { createStore } from 'redux';

import reducer from 'reducer';

const store = createStore(reducer);


ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
 document.getElementById('root')
 )
