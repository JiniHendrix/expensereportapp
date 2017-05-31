import React from 'react';
import Expenses from './Expenses';
import Nav from './Nav';
import ExpenseForm from './ExpenseForm';
import Login from './Login';
import Signup from './Signup';
import Users from './Users';
import UserForm from './UserForm';
import {
  toggleLoading,
  setUserDetails,
  toggleSignupSuccessful,
  setLoggedIn,
  setSignedUpFlag,
  unsetSignedUpFlag,
  setDefaultExpense,
  setUsersList
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

  render() {
    return (
      <div>
        <Nav userDetails={this.props.userDetails} isLoggedIn={this.props.isLoggedIn} setDefaultExpense={this.props.setDefaultExpense} />
        <Route exact path='/' component={() => { return <Login unsetSignedUpFlag={this.props.unsetSignedUpFlag} setUsersList={this.props.setUsersList} setUserDetails={this.props.setUserDetails} isLoggedIn={this.props.isLoggedIn} setLoggedIn={this.props.setLoggedIn} /> }} />
        <Route path='/signup' component={() => { return <Signup signedUp={this.props.signedUp} setSignedUpFlag={this.props.setSignedUpFlag} /> }} />
        <Route path='/home' render={() => {
          return !this.props.isLoggedIn ?
            <Redirect to='/' /> :
            this.props.userDetails.userType === 'User' ? <Expenses isEditing={this.props.isEditing} expenses={this.props.userDetails.expenses} username={this.props.userDetails.username} setUserDetails={this.props.setUserDetails} /> :
              this.props.userDetails.userType === 'User Manager' ? <Users usersList={this.props.usersList} setUsersList={this.props.setUsersList} /> :
                null
        }} />
        <Route path='/new_expense' render={() => { return this.props.isLoggedIn ? <ExpenseForm type='new' /> : <Redirect to='/' /> }} />
        <Route path='/edit_expense' render={() => { return <ExpenseForm type='edit' /> }} />
        <Route path='/add_user' render={() => {return <UserForm setUsersList={this.props.setUsersList}/>}} />
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
    },
    setDefaultExpense: () => {
      dispatch(setDefaultExpense());
    },
    setUsersList: (usersList) => {
      dispatch(setUsersList(usersList));
    }

  }
}

const mapStateToProps = (state) => {
  return {
    userDetails: state.userDetails,
    isLoggedIn: state.isLoggedIn,
    signedUp: state.signedUp,
    isEditing: state.isEditing,
    usersList: state.usersList
  }
}

const ContainerApp = connect(
  mapStateToProps,
  mapDispatchToProps,
)(App);

export default ContainerApp;