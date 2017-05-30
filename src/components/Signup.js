import React from 'react';
import { Link, Redirect } from 'react-router-dom';

export default class Signup extends React.PureComponent {
  signup(e) {
    e.preventDefault();

    const username = document.getElementById('username-input').value;
    const password = document.getElementById('password-input').value;
    const userType = document.getElementById('permission-input').value;
    const {setSignedUpFlag} = this.props;

    fetch('/user', {
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
        }
        else {
          setSignedUpFlag();
        }
      })
  }
  render() {
    return !this.props.signedUp ? (  
      <div className='login-signup'>
        <div className='container-fluid'>
          <form onSubmit={this.signup.bind(this)}>
            <div className='form-group'>
              <label for='username-input'>Username:</label>
              <input type='text' className='form-control' id='username-input' required />
            </div>
            <div className='form-group'>
              <label for='password-input'>Password:</label>
              <input type='password' className='form-control' id='password-input' required />
            </div>
            <div className='form-group'>
              <label for='permission-input'>Level:</label>
              <select className='form-control' id='permission-input' required>
                <option>User</option>
                <option>User Manager</option>
                <option>Admin</option>
              </select>
            </div>
            <Link className='link' to='/'>Login Page</Link>
            <input type="submit" className="btn btn-info" value="Submit Button" />
          </form>
        </div>
      </div>
    ) : <Redirect to='/' />
  }
}