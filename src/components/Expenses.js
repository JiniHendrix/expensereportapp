import React from 'react';
import Expense from './Expense';
import Filters from './Filters';
import WeeklyHeader from './WeeklyHeader';
import { Redirect } from 'react-router-dom';

export default class Expenses extends React.PureComponent {

  
  render() {
    const {
      filters,
      weeklyExpenses,
      weeklyExpensesIndex,
      expenses,
      viewingWeekly,
      adminSetUserExpenses,
      setUserDetails,
      username,
      selectedUser,
      isEditing,
      nextWeek,
      prevWeek,
      viewWeekly
    } = this.props;
    const filtering = filters.to || filters.from || filters.min || filters.max;

    const from = filters.from || '0000-00-00';
    const to = filters.to || '9999-99-99';
    const min = Number(filters.min) || -Infinity;
    const max = Number(filters.max) || Infinity;

    let expenseCopy = expenses.slice();

    if (viewingWeekly) {
      expenseCopy = weeklyExpenses[weeklyExpensesIndex].expenses;
    }

    const expensesArr = expenseCopy ? 
      expenseCopy.filter((elem, index) => {
        const date = elem.dateTime.slice(0, 10);
        if (!filtering) return true;

        return date >= from && date <= to && elem.amount >= min && elem.amount <= max;
      }).map((elem, index) => {
        return <Expense
          key={index}
          setUserDetails={setUserDetails}
          adminSetUserExpenses={adminSetUserExpenses}
          _id={elem._id}
          username={username}
          dateTime={elem.dateTime}
          amount={elem.amount}
          description={elem.description}
          comments={elem.comments}
          selectedUser={selectedUser}
          viewWeekly={viewWeekly}
        />
      }) : [];
    return isEditing ? <Redirect to='/edit_expense' /> : (
      <div>
        <Filters />
        {viewingWeekly ? <WeeklyHeader weeklyExpenses={weeklyExpenses[weeklyExpensesIndex]} nextWeek={nextWeek} prevWeek={prevWeek} /> : null}
        <div className='expenses'>
          {expensesArr}
        </div>
      </div>
    )
  }
}