import React from 'react';
import Expenses from './Expenses';
import Nav from './Nav';
import ExpenseForm from './ExpenseForm';
import Login from './Login';
import Signup from './Signup';
import {
  toggleLoading,
  setUserDetails,
  toggleSignupSuccessful,
  setLoggedIn,
  setSignedUpFlag,
  unsetSignedUpFlag
} from '../actions';
import { connect } from 'react-redux';
import { Route, Redirect } from 'react-router-dom';

class App extends React.Component {
  constructor() {
    super();

    this.getUserDetails = this.getUserDetails.bind(this);
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

  // submitHandler(type, e) {
  //   const username = this.props.userDetails.username;
  //   const {toggleLoading, setUserDetails} = this.props;
  //   const date = document.getElementById('date').value;
  //   const time = document.getElementById('time').value;
  //   const amount = document.getElementById('amount').value;
  //   const description = document.getElementById('description').value || '';
  //   const dateTime = new Date(date + 'T' + time);

  //   e.preventDefault();

  //   toggleLoading();

  //   if (type = 'new') {
  //     fetch(`/user/${username}/expenses`, {
  //       method: 'POST',
  //       body: JSON.stringify({
  //         dateTime,
  //         amount,
  //         description
  //       }),
  //       headers: {
  //         'Content-Type': 'application/json'
  //       }
  //     })
  //       .then(res => {
  //         return res.json();
  //       })
  //       .then(res => {
  //         setUserDetails(res);
  //         toggleLoading();
  //       })
  //   }

  //   if (type = 'edit') {
  //     fetch(`/user/${username}/expenses`, {
  //       method: 'PATCH',
  //       body: JSON.stringify({
  //         dateTime,
  //         amount,
  //         description
  //       }),
  //       headers: {
  //         'Content-Type': 'application/json'
  //       }
  //     })
  //       .then(res => {
  //         return res.json();
  //       })
  //       .then(res => {
  //         setUserDetails(res);
  //         toggleLoading();
  //       })
  //   }
  // }

  render() {
    return (
      <div>
        <Nav username={this.props.userDetails.username} isLoggedIn={this.props.isLoggedIn} />
        <Route exact path='/' component={() => { return <Login unsetSignedUpFlag={this.props.unsetSignedUpFlag} setUserDetails={this.props.setUserDetails} isLoggedIn={this.props.isLoggedIn} setLoggedIn={this.props.setLoggedIn} /> }} />
        <Route path='/signup' component={() => { return <Signup signedUp={this.props.signedUp} setSignedUpFlag={this.props.setSignedUpFlag} /> }} />
        <Route path='/home' render={() => { return this.props.isLoggedIn ? <Expenses isEditing={this.props.isEditing} expenses={this.props.userDetails.expenses} username={this.props.userDetails.username} setUserDetails={this.props.setUserDetails} /> : <Redirect to='/' /> }} />
        <Route path='/new_expense' render={() => { return this.props.isLoggedIn ? <ExpenseForm type='new' /> : <Redirect to='/' /> }} />
        <Route path='/edit_expense' render={() => { return <ExpenseForm type='edit' expenseDetails={this.props.expenseDetails} /> }} />
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
    setSignedUpFlag: () => {
      dispatch(setSignedUpFlag());
    },
    unsetSignedUpFlag: () => {
      dispatch(unsetSignedUpFlag());
    },
    setLoggedIn: () => {
      dispatch(setLoggedIn());
    }

  }
}

const mapStateToProps = (state) => {
  return {
    userDetails: state.userDetails,
    isLoggedIn: state.isLoggedIn,
    signedUp: state.signedUp,
    isEditing: state.isEditing
  }
}

const ContainerApp = connect(
  mapStateToProps,
  mapDispatchToProps,
)(App);

export default ContainerApp;