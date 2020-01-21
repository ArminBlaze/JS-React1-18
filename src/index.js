import React from 'react'
import ReactDOM from 'react-dom'
import App from './app'
import store from './store/index';
import { Provider } from 'react-redux';
import {ConnectedRouter} from 'connected-react-router'
import history from './history.js'


ReactDOM.render(
  <Provider store={store}>
    <ConnectedRouter history={history}>
      <App />
    </ConnectedRouter>
  </Provider>,
 document.getElementById('root')
 )
