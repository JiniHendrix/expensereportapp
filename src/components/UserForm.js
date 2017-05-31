import React from 'react';
import { Link, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import { handleUserFormChange, setDefaultUserFormValues } from '../actions';

class UserForm extends React.PureComponent {
  submitHandler(e) {
    e.preventDefault();

    const {
      username,
      password,
      userType,
      _id
    } = this.props.userFormValues;

    if (this.props.isEditing) {
      fetch(`/usermanager/${_id}`, {
        method: 'PATCH',
        body: JSON.stringify({
          username,
          password,
          userType
        }),
        headers: {
          'Content-Type': 'application/json'
        }
      })
        .then((res) => {
          if (res.status === 401) {
            document.querySelector('.login-signup').style.borderColor = 'red';
            return 'username exists';
          }
          return res.json();
        })
        .then(res => {
          if (res === 'username exists') return;
          this.props.setUsersList(res);
        })
    }
    else {
      fetch('/usermanager', {
        method: 'POST',
        body: JSON.stringify({
          username,
          password,
          userType
        }),
        headers: {
          'Content-Type': 'application/json'
        }
      })
        .then((res) => {
          if (res.status === 401) {
            document.querySelector('.login-signup').style.borderColor = 'red';
            return 'username exists';
          }
          return res.json();
        })
        .then(res => {
          if (res === 'username exists') return;
          this.props.setUsersList(res);
        })
    }

    this.props.setDefault();
  }
  render() {
    const {
      handleUserFormChange,
      userFormValues: {
        username,
        password,
        userType
      }
    } = this.props;

    return (
      <div className='login-signup'>
        <div className='container-fluid'>
          <form onSubmit={this.submitHandler.bind(this)}>
            <div className='form-group'>
              <label for='username-input'>Username:</label>
              <input type='text' className='form-control' id='username-input' value={username} onChange={handleUserFormChange.bind(this, 'username')} required />
            </div>
            <div className='form-group'>
              <label for='password-input'>Password:</label>
              <input type='text' className='form-control' id='password-input' value={password} onChange={handleUserFormChange.bind(this, 'password')} required />
            </div>
            <div className='form-group'>
              <label for='permission-input'>Level:</label>
              <select className='form-control' id='permission-input' value={userType} onChange={handleUserFormChange.bind(this, 'userType')} required>
                <option>User</option>
                <option>User Manager</option>
                <option>Admin</option>
              </select>
            </div>
            <input type="submit" className="btn btn-info" value="Submit" />
          </form>
        </div>
      </div>
    )
  }
}

const mapStateToProps = state => {
  return {
    userFormValues: state.userFormValues
  }
}

const mapDispatchToProps = dispatch => {
  return {
    handleUserFormChange: (field, e) => {
      dispatch(handleUserFormChange(field, e.target.value))
    },
    setDefault: () => {
      dispatch(setDefaultUserFormValues());
    }
  }
}

const ContainerUserForm = connect(
  mapStateToProps,
  mapDispatchToProps,
)(UserForm);

export default ContainerUserForm;