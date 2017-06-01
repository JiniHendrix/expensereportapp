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

  delete() {
    const setUserDetails = this.props.setUserDetails;
    fetch(`/user/${this.props.username}/expenses/${this.props._id}`, {
      method: 'DELETE'
    })
      .then(res => {
        return res.json();
      })
      .then(res => {
        setUserDetails(res);
      })
  }

  comment(e) {
    e.preventDefault();
    const comment = document.getElementById(this.props._id).value;

    fetch(`/user/${this.props.username}/expenses/${this.props._id}`, {
      method:'POST',
      body: JSON.stringify({
        comment
      }),
      headers:{
        'Content-Type': 'application/json'
      }
    })
      .then(res => {
        return res.json();
      })
      .then(res => {
        this.props.selectedUser ? this.props.adminSetUserExpenses(res) : this.props.setUserDetails(res);
      });
    document.getElementById(this.props._id).value = '';
  }

  deleteComment(id, e) {
    e.preventDefault;

    fetch(`/user/${this.props.username}/expenses/${this.props._id}/${id}`, {
      method: 'DELETE'
    })
      .then(res => {
        return res.json();
      })
      .then(res => {
        this.props.selectedUser ? this.props.adminSetUserExpenses(res) : this.props.setUserDetails(res);
      })
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

const ContainerExpense = connect(() => {return {}}, mapDispatchToProps)(Expense);

export default ContainerExpense;