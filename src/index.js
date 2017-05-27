import React from 'react'
import { render } from 'react-dom'
import { createStore } from 'redux'
import mainReducer from './reducers'
import Root from './components/Root'

let store = createStore(mainReducer, window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__())

render(
  <Root store={store}/>,
  document.getElementById('root'));