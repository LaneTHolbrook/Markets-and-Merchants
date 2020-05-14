import './index.css';
import * as serviceWorker from './serviceWorker';
import React from 'react'
import ReactDOM from 'react-dom'
import { Provider } from 'react-redux'
import { createStore } from 'redux'
import InventoryReducer from './redux/reducers/InventoryReducer'
import MarketplaceReducer from './redux/reducers/MarketplaceReducer'
import App from './App'
import { combineReducers } from 'redux'

const store = createStore(combineReducers({inventory: InventoryReducer, market: MarketplaceReducer}));

const rootElement = document.getElementById('root')
ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  rootElement
)

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
