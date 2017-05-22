import React from 'react';

const NewExpense = () => {
  return (
    <form class='form-horizontal'>
      <div className='form-group'>
        <label for='date-input'>Date:</label>
        <input type='text' id='date-input' placeholder='Date'></input>
      </div>
      <div className='form-group'>
        <label for='time-input'>Time:</label>
        <input type='text' id='time-input'></input>
      </div>
      <div className='form-group'>
        <label for='amount-input'>Amount:</label>
        <input type='text' id='amount-input'></input>
      </div>
      <div className='form-group'>
        <label for='desc-input'>Description:</label>
        <input type='text' id='desc-input'></input>
      </div>
    </form>
  )
}

export default NewExpense;