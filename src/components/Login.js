import React from 'react';

export default class Signup extends React.PureComponent {
  render() {
    return (
      <div className='login-signup'>
        <div className='container'>
          <form onSubmit={}>
            <div className='form-group'>
              <label for='username-input'>Username:</label>
              <input type='time' className='form-control' id='username-input' required />
            </div>
            <div className='form-group'>
              <label for='password-input'>Password:</label>
              <input type='time' className='form-control' id='password-input' required />
            </div>
            <input type="submit" className="btn btn-info" value="Submit Button" />
          </form>
        </div>
      </div>
    )
  }
}