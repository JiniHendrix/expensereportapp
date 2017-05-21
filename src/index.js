import React from 'react';
import { render } from 'react-dom';
import { Provider } from 'react-redux';
import { createStore } from 'redux';
import mainReducer from './reducers/reducers';
import App from './components/App';


{ render }.render(
  <Provider>
    <App />
  </Provider>,
  document.getElementById('root'));