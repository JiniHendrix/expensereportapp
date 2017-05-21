import React from 'react';
import Expenses from './Expenses';
import Nav from './Nav';
import NewExpense from './NewExpense';
import { Route, BrowserRouter as Router} from 'react-router-dom';

export default class App extends React.Component {
  render() {
    return (
      <Router>
        <div>
          <Nav />
          <Route path='/' component={Expenses} />
          <Route path='new_expense' component={NewExpense} />
        </div>
      </Router>
    )
  }
}