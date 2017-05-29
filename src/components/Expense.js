import React from 'react';

export default class Expense extends React.PureComponent {
  constructor() {
    super();
    this.delete = this.delete.bind(this);
  }

  edit() {
    const {
      _id,
      dateTime,
      amount,
      description
    } = this.props;
    this.props.editExpense({
      _id,
      dateTime,
      amount,
      description
    });
  }

  delete() {
    const setUserDetails = this.props.setUserDetails;
    fetch(`/user/${this.props.username}/expenses/${this.props._id}`, {
      method:'DELETE'
    })
      .then(res => {
        return res.json();
      })
      .then(res => {
        setUserDetails(res);
      })
  }

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
      <button className='btn' onClick={this.delete}>Delete</button>
      <button className='btn'>Edit</button>
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