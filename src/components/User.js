import React from 'react';

export default class User extends React.PureComponent {

  constructor() {
    super();

    this.delete = this.delete.bind(this);
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
        </div>
      </div>
    )
  }
}