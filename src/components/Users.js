import React from 'react';
import User from './User';

export default class Users extends React.PureComponent {

  render() {
    const users = this.props.usersList.map((user) => {
      <User user={user} />
    })

    return (
      <div className='expenses'>
        {users}
      </div>
    )
  }
}