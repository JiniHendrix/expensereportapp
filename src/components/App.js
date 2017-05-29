import React from 'react';
import Expenses from './Expenses';
import Nav from './Nav';
import NewExpense from './NewExpense';
import { toggleLoading, setUserDetails } from '../actions';
import { connect } from 'react-redux';
import { Route } from 'react-router-dom';

class App extends React.Component {
  constructor() {
    super();

    this.submitHandler = this.submitHandler.bind(this);
    this.getUserDetails = this.getUserDetails.bind(this);
  }

  componentDidMount() {
    this.getUserDetails();
  }

  getUserDetails() {
    const username = this.props.userDetails.username;
    const {setUserDetails} = this.props;

    fetch(`/user/${username}`)
      .then((res) => {
        return res.json();
      }).then((res) => {
        setUserDetails(res);
      })
  }

  submitHandler(e) {
    const username = this.props.userDetails.username;
    const {toggleLoading, setUserDetails} = this.props;
    const date = document.getElementById('date-input').value;
    const time = document.getElementById('time-input').value;
    const amount = document.getElementById('amount-input').value;
    const description = document.getElementById('desc-input').value || '';
    const dateTime = new Date(date + 'T' + time);

    e.preventDefault();

    toggleLoading();

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
      .then((res) => {
        return res.json();
      })
      .then(res => {
        setUserDetails(res);
        toggleLoading();
      })
  }
  render() {
    return (
      <div>
        <Nav username={this.props.userDetails.username} />
        <Route path='/home' component={() => { return <Expenses expenses={this.props.userDetails.expenses} /> }} />
        <Route path='/new_expense' component={() => { return <NewExpense submitHandler={this.submitHandler} /> }} />
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
    }
  }
}

const mapStateToProps = (state) => {
  return {
    userDetails: state.userDetails
  }
}

const ContainerApp = connect(
  mapStateToProps,
  mapDispatchToProps,
)(App);

export default ContainerApp;