import React from 'react';
import { Link } from 'react-router-dom';

export default class Nav extends React.PureComponent {
  render() {
    if (!this.props.isLoggedIn) return null;

    let nav;
    const {userType} = this.props.userDetails;

    if (userType === 'User') {
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
    else if (userType === 'User Manager' || (userType === 'Admin' && !this.props.selectedUser)) {
      nav = (
        <ul className='nav navbar-nav'>
          <li>
            <Link to='/home' onClick={this.props.setDefaultUserFormValues.bind(this)}>Home</Link>
          </li>
          <li>
            <Link to='/add_user' onClick={this.props.setDefaultUserFormValues.bind(this)}>Add User</Link>
          </li>
        </ul>
      )
    }
    else if (userType === 'Admin' && this.props.selectedUser) {
      nav = (
        <ul className='nav navbar-nav'>
          <li>
            <Link to='/home' onClick={this.props.doneViewingUser}>Home</Link>
          </li>
          <li>
            <Link to='/view_user' onClick={this.props.setDefaultExpense}>{this.props.selectedUser.username}</Link>
          </li>
          <li>
            <Link to='/new_expense' onClick={this.props.setDefaultExpense}>New Expense</Link>
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