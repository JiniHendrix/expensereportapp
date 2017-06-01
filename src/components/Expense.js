import React from 'react';
import { connect } from 'react-redux';
import { editExpense } from '../actions';

class Expense extends React.PureComponent {
  constructor() {
    super();
    this.delete = this.delete.bind(this);
    this.edit = this.edit.bind(this);
    this.comment = this.comment.bind(this);
    this.deleteComment = this.deleteComment.bind(this);
  }

  viewWeekly() {
    const weeklyExpenses = [];

    function Week({sunday, saturday}, expense) {
      this.total = expense.amount;
      this.average = 0;
      this.count = 1;
      this.sundayDate = sunday;
      this.saturdayDate = saturday;
      this.expenses = [expense];
    }
    const expenses = this.props.selectedUser ? this.props.selectedUser.expenses : this.props.userDetails.expenses;

    let currWeek = new Week(this.getWeekEnds(expenses[0].dateTime), expenses[0]);

    for (let i = 1; i < expenses.length; i++) {
      if (expenses[i].dateTime.slice(0, 10) > currWeek.saturdayDate.toISOString().slice(0, 10) || expenses[i].dateTime.slice(0, 10) < currWeek.sundayDate.toISOString().slice(0, 10)) {
        currWeek.average = currWeek.total / currWeek.count;
        weeklyExpenses.push(currWeek);
        currWeek = new Week(this.getWeekEnds(expenses[i].dateTime), expenses[i]);
      } else {
        currWeek.total += expenses[i].amount;
        currWeek.count++;
        currWeek.expenses.push(expenses[i]);
      }
    }
    currWeek.average = currWeek.total / currWeek.count;
    weeklyExpenses.push(currWeek);

    this.props.viewWeekly(weeklyExpenses);
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
      date: dateTime.slice(0, 10),
      time: dateTime.slice(11, 16),
      amount,
      description
    });
  }

  responseHandler(fetchPromise) {
    fetchPromise.then(res => {
      return res.json();
    })
      .then(res => {
        this.props.selectedUser ? this.props.adminSetUserExpenses(res) : this.props.setUserDetails(res);
      })
  }

  delete() {
    const fetchPromise = fetch(`/user/${this.props.username}/expenses/${this.props._id}`, {
      method: 'DELETE'
    });
    this.responseHandler(fetchPromise);
  }

  comment(e) {
    e.preventDefault();
    const comment = document.getElementById(this.props._id).value;

    const fetchPromise = fetch(`/user/${this.props.username}/expenses/${this.props._id}`, {
      method: 'POST',
      body: JSON.stringify({
        comment
      }),
      headers: {
        'Content-Type': 'application/json'
      }
    });
    this.responseHandler(fetchPromise);
    document.getElementById(this.props._id).value = '';
  }

  deleteComment(id, e) {
    e.preventDefault;

    const fetchPromise = fetch(`/user/${this.props.username}/expenses/${this.props._id}/${id}`, {
      method: 'DELETE'
    })
    this.responseHandler(fetchPromise);
  }
  render() {
    const {
      dateTime,
      amount,
      description,
      comments
    } = this.props;

    const commArr = comments.map((elem, i) => {
      return <li key={i}>{elem.comment} <button onClick={this.deleteComment.bind(null, elem._id)} className='btn'>X</button></li>
    });

    const dateInst = new Date(dateTime);

    return (
      <div className='expense container-fluid'>
        <div className='expense-left-col'>
          <p className='expense-date'>{dateInst.toLocaleString()}</p>
          <p className='expense-desc'>{description}</p>
        </div>
        <button className='btn' onClick={this.delete}>Delete</button>
        <button className='btn' onClick={this.edit}>Edit</button>
        <h1 className='amount'>{`\$${amount}`}</h1>
        <hr />
        <div className='comments'>
          <ul>
            {commArr}
          </ul>
          <form onSubmit={this.comment} >
            <div className='form-group'>
              <input type='text' id={this.props._id} className='form-control' placeholder='Comment...'></input>
            </div>
          </form>
        </div>
      </div>
    )
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    editExpense: (expenseDetails) => {
      dispatch(editExpense(expenseDetails))
    }
  }
}

const ContainerExpense = connect(() => { return {} }, mapDispatchToProps)(Expense);

export default ContainerExpense;