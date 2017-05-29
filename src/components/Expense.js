import React from 'react';

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