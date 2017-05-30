import React from 'react';
import { Link, Redirect } from 'react-router-dom';

export default class Login extends React.PureComponent {
  constructor() {
    super();
    this.login = this.login.bind(this);
  }
  componentWillMount(props) {
    this.props.unsetSignedUpFlag();
  }

  login(e) {
    e.preventDefault();

    const {setLoggedIn, setUserDetails, setUsersList} = this.props;
    const username = document.getElementById('username-input').value;
    const password = document.getElementById('password-input').value;

    fetch(`/login/${username}/${password}`)
      .then((res) => {
        if (res.status === 401) {
          console.log('wrong username/password');
          document.querySelector('.login-signup').style.borderColor = 'red';
        }
        else {
          return res.json();
        }
      })
      .then((res) => {
        if (res) {
          setUserDetails(res.user);
          setUsersList(res.usersList)
          setLoggedIn();
        }
      })
  }

  render() {
    return !this.props.isLoggedIn ? (
      <div className='login-signup'>
        <div className='container-fluid'>
          <form onSubmit={this.login}>
            <div className='form-group'>
              <label for='username-input'>Username:</label>
              <input type='text' className='form-control' id='username-input' required />
            </div>
            <div className='form-group'>
              <label for='password-input'>Password:</label>
              <input type='password' className='form-control' id='password-input' required />
            </div>
            <Link className='link' to='/signup'>Signup Now</Link>
            <input type="submit" className="btn btn-info" value="Submit Button" />
          </form>
        </div>
      </div>
    ) : <Redirect to='/home' />
  }
}