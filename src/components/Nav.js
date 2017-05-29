import React from 'react';
import { Link } from 'react-router-dom';

export default class Nav extends React.PureComponent {
  render() {
    return this.props.isLoggedIn ? (
      <nav className="navbar navbar-default navbar-fixed-top">
        <div className='container-fluid'>
          <ul className='nav navbar-nav'>
            <li>
              <Link to='/home' onClick={this.props.setDefaultExpense}>Home</Link>
            </li>
            <li>
              <Link to='/new_expense' onClick={this.props.setDefaultExpense}>New Expense</Link>
            </li>
          </ul>
          <ul className='nav navbar-nav navbar-right'>
            <li id='user'>
              <a href='#'>{this.props.username}</a>
            </li>
          </ul>
        </div>
      </nav>
    ) : null;
  }
}