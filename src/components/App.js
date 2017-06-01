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
  setUsersList,
  setDefaultUserFormValues,
  editingUser,
  adminSetUserExpenses,
  doneViewingUser,
  prevWeek,
  nextWeek,
  viewNormal,
  viewWeekly
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
        <Nav
          userDetails={this.props.userDetails}
          setDefaultUserFormValues={this.props.setDefaultUserFormValues}
          isLoggedIn={this.props.isLoggedIn}
          setDefaultExpense={this.props.setDefaultExpense}
          selectedUser={this.props.selectedUser}
          doneViewingUser={this.props.doneViewingUser}
          viewNormal={this.props.viewNormal}
        />
        <Route exact path='/' component={() => {
          return <Login
            unsetSignedUpFlag={this.props.unsetSignedUpFlag}
            setUsersList={this.props.setUsersList}
            setUserDetails={this.props.setUserDetails}
            isLoggedIn={this.props.isLoggedIn}
            setLoggedIn={this.props.setLoggedIn}
          />
        }} />
        <Route path='/signup' component={() => { return <Signup signedUp={this.props.signedUp} setSignedUpFlag={this.props.setSignedUpFlag} /> }} />
        <Route path='/home' render={() => {
          return !this.props.isLoggedIn ? <Redirect to='/' /> :
            this.props.userDetails.userType === 'User' ?
              <Expenses
                isEditing={this.props.isEditing}
                expenses={this.props.userDetails.expenses}
                username={this.props.userDetails.username}
                setUserDetails={this.props.setUserDetails}
                selectedUser={this.props.selectedUser}
                adminSetUserExpenses={this.props.adminSetUserExpenses}
                filters={this.props.filters}
                viewingWeekly={this.props.viewingWeekly}
                weeklyExpenses={this.props.weeklyExpenses}
                weeklyExpensesIndex={this.props.weeklyExpensesIndex}
                prevWeek={this.props.prevWeek}
                nextWeek={this.props.nextWeek}
                viewWeekly={this.props.viewWeekly}
              /> :
              <Users
                usersList={this.props.usersList}
                editingUser={this.props.editingUser}
                setUsersList={this.props.setUsersList}
                isEditing={this.props.isEditing}
                userType={this.props.userDetails.userType}
                adminSetUserExpenses={this.props.adminSetUserExpenses}
                selectedUser={this.props.selectedUser}
              />
        }} />
        <Route path='/new_expense' render={() => { return this.props.isLoggedIn ? <ExpenseForm type='new' /> : <Redirect to='/' /> }} />
        <Route path='/edit_expense' render={() => { return <ExpenseForm type='edit'/> }} />
        <Route path='/add_user' render={() => {
          return <UserForm
            isEditing={this.props.isEditing}
            setUsersList={this.props.setUsersList}
          />
        }} />
        <Route path='/edit_user' render={() => {
          return <UserForm
            isEditing={this.props.isEditing}
            setUsersList={this.props.setUsersList}
          />
        }} />
        <Route path='/view_user' render={() => {
          return <Expenses
            isEditing={this.props.isEditing}
            expenses={this.props.selectedUser.expenses}
            username={this.props.selectedUser.username}
            setUserDetails={this.props.setUserDetails}
            selectedUser={this.props.selectedUser}
            adminSetUserExpenses={this.props.adminSetUserExpenses}
            filters={this.props.filters}
            viewingWeekly={this.props.viewingWeekly}
            weeklyExpenses={this.props.weeklyExpenses}
            weeklyExpensesIndex={this.props.weeklyExpensesIndex}
            prevWeek={this.props.prevWeek}
            nextWeek={this.props.nextWeek}
            viewWeekly={this.props.viewWeekly}
          />
        }} />
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
    },
    setDefaultUserFormValues: () => {
      dispatch(setDefaultUserFormValues());
    },
    editingUser: userDetails => {
      dispatch(editingUser(userDetails));
    },
    adminSetUserExpenses: userDetails => {
      dispatch(adminSetUserExpenses(userDetails));
    },
    doneViewingUser: () => {
      dispatch(doneViewingUser());
    },
    prevWeek: () => {
      dispatch(prevWeek());
    },
    nextWeek: () => {
      dispatch(nextWeek());
    },
    viewNormal: () => {
      dispatch(viewNormal());
    },
    viewWeekly: () => {
      dispatch(viewWeekly());
    }
  }
}

const mapStateToProps = (state) => {
  return {
    userDetails: state.userDetails,
    isLoggedIn: state.isLoggedIn,
    signedUp: state.signedUp,
    isEditing: state.isEditing,
    usersList: state.usersList,
    selectedUser: state.selectedUser,
    filters: state.filters,
    viewingWeekly: state.viewingWeekly,
    weeklyExpenses: state.weeklyExpenses,
    weeklyExpensesIndex: state.weeklyExpensesIndex
  }
}

const ContainerApp = connect(
  mapStateToProps,
  mapDispatchToProps,
)(App);

export default ContainerApp;