import React from 'react';
import Expense from './Expense';

export default class Expenses extends React.PureComponent {
  render() {
    const expensesArr = this.props.expenses ? this.props.expenses.map((elem, index) => {
      return <Expense id={index} dateTime={elem.dateTime} amount={elem.amount} description={elem.description} comments={elem.comments} />
    }) : [];
    return (
      <div className='expenses'>
        {expensesArr}
      </div>
    )
  }
}