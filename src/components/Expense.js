import React from 'react';


/*const Expense = () => {
  return (
    <div className='expense container-fluid'>
      <div className='expense-left-col'>
        <p className='expense-date'>2017-06-02 5:05 PM</p>
        <p className='expense-desc'>Bought a SSD</p>
      </div>
      <h1 className='amount'>$100</h1>
      <hr />
      <div className='comments'>
        <div className='comment'>This SSD is awesome</div>
        <form>
          <div className='form-group'>
            <input type='text' className='form-control' placeholder='Comment...'></input>
          </div>
        </form>
      </div>
    </div>
  )
}

export default Expense;*/

export default class Expense extends React.PureComponent {
  render() {
    const {
      dateTime,
      amount,
      description,
      comments
    } = this.props;

    return (
    <div className='expense container-fluid'>
      <div className='expense-left-col'>
        <p className='expense-date'>{dateTime}</p>
        <p className='expense-desc'>{description}</p>
      </div>
      <h1 className='amount'>{`\$${amount}`}</h1>
      <hr />
      <div className='comments'>
        <div className='comment'>This SSD is awesome</div>
        <form>
          <div className='form-group'>
            <input type='text' className='form-control' placeholder='Comment...'></input>
          </div>
        </form>
      </div>
    </div>
  )
  }
}