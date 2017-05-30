import React from 'react';
import User from './User';

export default class Users extends React.PureComponent {

  render() {
    // console.log(this.props)
    const users = this.props.usersList.map((user) => {
      <User user={user} />
    });
    console.log('users:', users)

    return (
      <div className='expenses'>
        {users}
      </div>
    )
  }
}