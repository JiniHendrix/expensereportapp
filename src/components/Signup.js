import React from 'react';

export default class Login extends React.PureComponent {
  render() {
    return (
      <div className='login-signup'>
        <div className='container'>
          <form onSubmit={}>
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
            <input type="submit" className="btn btn-info" value="Submit Button" />
          </form>
        </div>
      </div>
    )
  }
}