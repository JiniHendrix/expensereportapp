import React from 'react'
import { Provider } from 'react-redux'
import { Route, browserHistory, BrowserRouter as Router } from 'react-router-dom'
import App from './App'

const Root = ({ store }) => {
  return (
    <Provider store={store}>
      <Router history={browserHistory}>
        <Route path='/' component={App} />
      </Router>
    </Provider>
  )
}

export default Root

/*export default class Root extends React.PureComponent {
  render() {
    return (
    <Provider store={store}>
      <Router history={browserHistory}>
        <Route path='/' component={App} />
      </Router>
    </Provider>
  )
  }
}*/