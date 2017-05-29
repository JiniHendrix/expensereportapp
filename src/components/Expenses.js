import React from 'react';
import Expense from './Expense';

export default class Expenses extends React.PureComponent {
  render() {
    const expensesArr = this.props.expenses ? this.props.expenses.map((elem, index) => {
      return <Expense key={index} setUserDetails={this.props.setUserDetails} _id={elem._id} username={this.props.username} dateTime={elem.dateTime} amount={elem.amount} description={elem.description} comments={elem.comments} />
    }) : [];
    return (
      <div className='expenses'>
        {expensesArr}
      </div>
    )
  }
}