import React from 'react';
import Expense from './Expense';

/*const Expenses = ({expenses}) => {
  const expensesArr = expenses.map((elem) => {
    return <Expense dateTime={elem.dateTime} amount={elem.amount} description={elem.description} comments=
  })
  return (
    <div className='expenses'>
      <Expense />
      <Expense />
      <Expense />
    </div>
  )
}

export default Expenses;*/

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