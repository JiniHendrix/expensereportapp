import React from 'react';
import {
  toggleLoading,
  setUserDetails,
  handleExpenseFormChange,
  setDefaultExpense,
  adminSetUserExpenses,
  viewWeekly
} from '../actions';
import { connect } from 'react-redux';
import {Redirect} from 'react-router-dom';

class ExpenseForm extends React.PureComponent {

  constructor() {
    super();
  }

  submitHandler(e) {
    const {
      toggleLoading, 
      setUserDetails, 
      setDefaultExpense,
      selectedUser,
      userDetails,
      viewingWeekly,
      expenseFormValues: {
        date,
        time,
        amount,
        description,
        _id
      },
      adminSetUserExpenses,
      viewWeekly
    } = this.props;
    const username = selectedUser ? selectedUser.username : userDetails.username;

    const dateTime = new Date(date + 'T' + time);
    e.preventDefault();

    toggleLoading();

    if (this.props.type === 'new') {
      fetch(`/user/${username}/expenses`, {
        method: 'POST',
        body: JSON.stringify({
          dateTime,
          amount,
          description
        }),
        headers: {
          'Content-Type': 'application/json'
        }
      })
        .then(res => {
          return res.json();
        })
        .then(res => {
          //ternary here for admin vs user
          selectedUser ? adminSetUserExpenses(res) : setUserDetails(res);
          toggleLoading();
          if (this.props.viewingWeekly) viewWeekly();
        })
    }

    if (this.props.type === 'edit') {
      fetch(`/user/${username}/expenses/${_id}`, {
        method: 'PATCH',
        body: JSON.stringify({
          dateTime,
          amount,
          description
        }),
        headers: {
          'Content-Type': 'application/json'
        }
      })
        .then(res => {
          return res.json();
        })
        .then(res => {
          selectedUser ? adminSetUserExpenses(res) : setUserDetails(res);
          toggleLoading();
          if (this.props.viewingWeekly) viewWeekly();
        })
    }
    setDefaultExpense();
  }

  render() {
    const {
      amount,
      description,
      date,
      time
    } = this.props.expenseFormValues;
    
    if (this.props.type === 'edit' && this.props.isEditing === false) {
      return <Redirect to='/home' />
    }
    
    return  (
      <div className='wrapper'>
        <div className='container-fluid'>
          <form onSubmit={this.submitHandler.bind(this)}>
            <div className='form-group'>
              <label for='date'>Date:</label>
              <input type='date' className='form-control' onChange={this.props.handleExpenseFormChange.bind(this, 'date')} id='date' placeholder='Date' value={date} required />
            </div>
            <div className='form-group'>
              <label for='time'>Time:</label>
              <input type='time' className='form-control' id='time' onChange={this.props.handleExpenseFormChange.bind(this, 'time')} value={time} required />
            </div>
            <div className='form-group'>
              <label for='amount'>Amount:</label>
              <input type='number' className='form-control' id='amount' onChange={this.props.handleExpenseFormChange.bind(this, 'amount')} value={amount} required />
            </div>
            <div className='form-group'>
              <label for='description' >Description:</label>
              <textarea className='form-control' rows='2' id='description' onChange={this.props.handleExpenseFormChange.bind(this, 'description')} value={description} />
            </div>
            <input type="submit" className="btn btn-info" value="Submit Button" />
          </form>
        </div>
      </div>
    )
  }
}


const mapDispatchToProps = function (dispatch) {
  return {
    toggleLoading: (e) => {
      dispatch(toggleLoading());
    },
    setUserDetails: (userDetails) => {
      dispatch(setUserDetails(userDetails));
    },
    handleExpenseFormChange: (name, e) => {
      dispatch(handleExpenseFormChange(name, e.target.value));
    },
    setDefaultExpense: () => {
      dispatch(setDefaultExpense());
    },
    adminSetUserExpenses: (userDetails) => {
      dispatch(adminSetUserExpenses(userDetails))
    },
    viewWeekly: () => {
      dispatch(viewWeekly());
    }
  }
}

const mapStateToProps = (state) => {
  return {
    expenseFormValues: state.expenseFormValues,
    userDetails: state.userDetails,
    isEditing: state.isEditing,
    selectedUser: state.selectedUser,
    viewingWeekly: state.viewingWeekly
  }
}

const ContainerExpenseForm = connect(
  mapStateToProps,
  mapDispatchToProps,
)(ExpenseForm);

export default ContainerExpenseForm;