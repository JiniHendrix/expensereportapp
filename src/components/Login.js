import React from 'react';
import {Link} from 'react-router-dom';
import createHistory from 'history/createBrowserHistory';

const history = createHistory();

export default class Login extends React.PureComponent {
  login() {
    fetch(`/login/${username}/${password}`)
      .then((res) => {
        if (res.status === 401) {
          console.log('wrong username/password');
        }
        else {
          //isloggedin
        }
      })
  }
  render() {
    return (
      <div className='login-signup'>
        <div className='container'>
          <form>
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
    )
  }
}