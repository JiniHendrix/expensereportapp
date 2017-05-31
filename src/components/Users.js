import React from 'react';
import User from './User';
import { Redirect } from 'react-router-dom';

export default class Users extends React.PureComponent {

  render() {
    if (this.props.isEditing) {
      return <Redirect to='/edit_user' />
    }
    if (this.props.selectedUser) {
      return <Redirect to ='/view_user' />
    }

    const users = this.props.usersList.map((user, i) => {
      return <User
        key={i}
        user={user}
        editingUser={this.props.editingUser}
        setUsersList={this.props.setUsersList}
        userType={this.props.userType}
        adminSetUserExpenses={this.props.adminSetUserExpenses}
      />
    });


    return (
      <div className='expenses'>
        {users}
      </div>
    )
  }
}