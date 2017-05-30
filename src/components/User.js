import React from 'react';

export default class User extends React.PureComponent {

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
          <button className='btn'>Delete</button>
          <button className='btn'>Edit</button>
        </div>
      </div>
    )
  }
}