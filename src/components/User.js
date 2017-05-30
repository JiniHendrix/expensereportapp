import React from 'react';

export default class User extends React.PureComponent {

  render() {
    const {
      username,
      password,
      type
    } = this.props.user;

    return (
      <div className='expense container-fluid'>
        <div className='user-pass'>
          <p>{username}</p>
          <p>{password}</p>
        </div>
        <div className='buttons-type'>
          <button className='btn'>Edit</button>
          <button className='btn'>Delete</button>
          <h1>{type}</h1>
        </div>
      </div>
    )
  }
}