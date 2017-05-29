import React from 'react';

export default class NewExpense extends React.PureComponent {
  render() {
    return (
      <div className='wrapper'>
        <div className='container-fluid'>
          <form onSubmit={this.props.submitHandler}>
            <div className='form-group'>
              <label for='date-input'>Date:</label>
              <input type='date' className='form-control' id='date-input' placeholder='Date' required />
            </div>
            <div className='form-group'>
              <label for='time-input'>Time:</label>
              <input type='time' className='form-control' id='time-input' required />
            </div>
            <div className='form-group'>
              <label for='amount-input'>Amount:</label>
              <input type='number' className='form-control' id='amount-input' required />
            </div>
            <div className='form-group'>
              <label for='desc-input' >Description:</label>
              <textarea className='form-control' rows='2' id='desc-input' />
            </div>
            <input type="submit" className="btn btn-info" value="Submit Button" />
          </form>
        </div>
      </div>
    )
  }
}