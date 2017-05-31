import React from 'react';
import Expense from './Expense';
import Filters from './Filters';
import WeeklyHeader from './WeeklyHeader';
import { Redirect } from 'react-router-dom';

export default class Expenses extends React.PureComponent {
  render() {
    const {filters} = this.props;
    const filtering = filters.to || filters.from || filters.min || filters.max;

    const from = filters.from || '0000-00-00';
    const to = filters.to || '9999-99-99';
    const min = Number(filters.min) || -Infinity;
    const max = Number(filters.max) || Infinity;
    
    const expensesArr = this.props.expenses ? filtering ?
    this.props.expenses.filter((elem, index) => {
      const date = elem.dateTime.slice(0, 10);
      
      return date >= from && date <= to && elem.amount >= min && elem.amount <= max;
    }).map((elem, index) => {
      return <Expense
        key={index}
        setUserDetails={this.props.setUserDetails}
        adminSetUserExpenses={this.props.adminSetUserExpenses}
        _id={elem._id}
        username={this.props.username}
        dateTime={elem.dateTime}
        amount={elem.amount}
        description={elem.description}
        comments={elem.comments}
        selectedUser={this.props.selectedUser}
      />
    }) :  
    this.props.expenses.map((elem, index) => {
      return <Expense
        key={index}
        setUserDetails={this.props.setUserDetails}
        adminSetUserExpenses={this.props.adminSetUserExpenses}
        _id={elem._id}
        username={this.props.username}
        dateTime={elem.dateTime}
        amount={elem.amount}
        description={elem.description}
        comments={elem.comments}
        selectedUser={this.props.selectedUser}
      />
    }) : [];
    return this.props.isEditing ? <Redirect to='/edit_expense' /> : (
      <div>
        <Filters />
        {this.props.viewingWeekly ? <WeeklyHeader /> : null}
        <div className='expenses'>
          {expensesArr}
        </div>
      </div>
    )
  }
}