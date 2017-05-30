import React from 'react';
import { Link } from 'react-router-dom';

export default class Nav extends React.PureComponent {
  render() {
    if (!this.props.isLoggedIn) return null;

    let nav;

    if (this.props.userDetails.type === 'User') {
      nav = (
        <ul className='nav navbar-nav'>
          <li>
            <Link to='/home' onClick={this.props.setDefaultExpense}>Home</Link>
          </li>
          <li>
            <Link to='/new_expense' onClick={this.props.setDefaultExpense}>New Expense</Link>
          </li>
        </ul>
      )
    }
    else if (this.props.userDetails.type === 'User Manager') {
      nav = (
        <ul className='nav navbar-nav'>
          <li>
            <Link to='/home'>Home</Link>
          </li>
          <li>
            <Link to='/new_user'>New User</Link>
          </li>
        </ul>
      )
    }

    return (
      <nav className="navbar navbar-default navbar-fixed-top">
        <div className='container-fluid'>
          {nav}
          <ul className='nav navbar-nav navbar-right'>
            <li id='user'>
              <a href='#'>{this.props.userDetails.username}</a>
            </li>
          </ul>
        </div>
      </nav>
    );

  }
}