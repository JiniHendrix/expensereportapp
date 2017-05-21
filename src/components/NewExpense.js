import React from 'react';

const NewExpense = () => {
  return (
    <form>
      <label>Date</label><input type='text'></input>
      <label>Time</label><input type='text'></input>
      <label>Amount</label><input type='text'></input>
      <label>Description</label><input type='text'></input>
    </form>
  )
}

export default NewExpense;