import React from 'react';
import ReactDOM from 'react-dom';
import registerServiceWorker from './registerServiceWorker';
import { createStore, applyMiddleware } from 'redux'
import { Provider } from 'react-redux'
import thunk from 'redux-thunk' // 异步得组件

import rootReducer from './reducers'
import AppleBasket from './containers/AppleBasket'

const store = createStore(rootReducer, applyMiddleware(thunk));

ReactDOM.render(
  <Provider store={store}>
    <AppleBasket />
  </Provider>,
  document.getElementById('root')
);

registerServiceWorker();
