import React from 'react';
import {
  toggleLoading,
  setUserDetails,
  handleChange,
  setDefaultExpense
} from '../actions';
import { connect } from 'react-redux';
import {Redirect} from 'react-router-dom';

class ExpenseForm extends React.PureComponent {

  constructor() {
    super();
  }

  submitHandler(e) {
    const username = this.props.userDetails.username;
    const {toggleLoading, setUserDetails, setDefaultExpense} = this.props;
    const date = document.getElementById('date').value;
    const time = document.getElementById('time').value;
    const amount = document.getElementById('amount').value;
    const description = document.getElementById('description').value || '';
    const dateTime = new Date(date + 'T' + time);
    const id = this.props.expenseDetails._id;
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
          setUserDetails(res);
          toggleLoading();
        })
    }

    if (this.props.type === 'edit') {
      fetch(`/user/${username}/expenses/${id}`, {
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
          setUserDetails(res);
          toggleLoading();
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
    } = this.props.expenseDetails;
    
    if (this.props.type === 'edit' && this.props.isEditing === false) {
      return <Redirect to='/home' />
    }
    
    return  (
      <div className='wrapper'>
        <div className='container-fluid'>
          <form onSubmit={this.submitHandler.bind(this)}>
            <div className='form-group'>
              <label for='date'>Date:</label>
              <input type='date' className='form-control' onChange={this.props.handleChange.bind(this, 'date')} id='date' placeholder='Date' value={date} required />
            </div>
            <div className='form-group'>
              <label for='time'>Time:</label>
              <input type='time' className='form-control' id='time' onChange={this.props.handleChange.bind(this, 'time')} value={time} required />
            </div>
            <div className='form-group'>
              <label for='amount'>Amount:</label>
              <input type='number' className='form-control' id='amount' onChange={this.props.handleChange.bind(this, 'amount')} value={amount} required />
            </div>
            <div className='form-group'>
              <label for='description' >Description:</label>
              <textarea className='form-control' rows='2' id='description' onChange={this.props.handleChange.bind(this, 'description')} value={description} />
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
    handleChange: (name, e) => {
      dispatch(handleChange(name, e.target.value));
    },
    setDefaultExpense: () => {
      dispatch(setDefaultExpense());
    }
  }
}

const mapStateToProps = (state) => {
  return {
    expenseDetails: state.expenseDetails,
    userDetails: state.userDetails,
    isEditing: state.isEditing
  }
}

const ContainerExpenseForm = connect(
  mapStateToProps,
  mapDispatchToProps,
)(ExpenseForm);

export default ContainerExpenseForm;