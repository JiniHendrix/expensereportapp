import React from 'react';

export default class User extends React.PureComponent {

  constructor() {
    super();

    this.delete = this.delete.bind(this);
    this.viewUserExpenses = this.viewUserExpenses.bind(this)
  }

  delete() {
    console.log(this.props)
    fetch(`/usermanager/${this.props.user.username}`, {
      method: 'DELETE'
    })
      .then(res => {
        return res.json();
      })
      .then(res => {
        this.props.setUsersList(res);
      })
  }

  viewUserExpenses() {
    fetch(`/user/${this.props.user.username}`)
      .then(res => {
        return res.json();
      })
      .then(res => {
        this.props.adminSetUserExpenses(res);
      })
  }

  render() {
    const {
      username,
      password,
      userType
    } = this.props.user;

    return (
      <div className='expense container-fluid'>
        <div className='user-pass'>
          <p>username: {username}</p>
          <p>password: {password}</p>
        </div>
        <div className='buttons-type'>
          <button className='btn' onClick={this.delete}>Delete</button>
          <button className='btn' onClick={this.props.editingUser.bind(null, this.props.user)}>Edit</button>
          {this.props.userType === 'Admin' ? <button className='btn' onClick={this.viewUserExpenses}>View Expenses</button> : null}
        </div>
      </div>
    )
  }
}