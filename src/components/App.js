import React from 'react';
import Expenses from './Expenses';
import Nav from './Nav';
import NewExpense from './NewExpense';
import {toggleLoading} from '../actions';
import {connect} from 'react-redux';
import { Route } from 'react-router-dom';

class App extends React.Component {
  render() {
    const {props, submitHandler} = this.props;

    return (
        <div>
          <Nav />
          <Route path='/home' component={Expenses} />
          <Route path='/new_expense' component={()=>{return <NewExpense submitHandler={submitHandler} />}} />
        </div>
    )
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    submitHandler: (e) => {
      const username = this.props.user.username;
      const date = document.getElementById('date-input').value;
      const time = document.getElementById('time-input').value;
      const amount = document.getElementById('amount-input').value;
      const description = document.getElementById('desc-input').value || '';
      const dateTime = new Date(date+'T'+time);

      e.preventDefault();

      dispatch(toggleLoading());

      fetch(`/user/${username}/expenses`, {
        method: 'POST',
        body: {
          dateTime,
          amount,
          description
        },
        headers: {
          'Content-Type': 'application/json'
        }
      }).then((res) => {
        console.log(res);
        dispatch(toggleLoading());
      })
      //dispatch an action that changes an isLoading bool to true
      //make my post request
      //dispatch an acttion that changes an isLoading bool to false
    }
  }
}

const mapStateToProps = (state) => {
  return {
    user: state.user
  }
}

const ContainerApp = connect(
  mapStateToProps,
  mapDispatchToProps,
)(App);

export default ContainerApp;