import React from 'react';
import { connect } from 'react-redux';
import { applyFilters, viewWeekly, viewNormal } from '../actions';

class Filters extends React.PureComponent {

  constructor() {
    super();
    this.applyFilters = this.applyFilters.bind(this);
    this.resetFilters = this.resetFilters.bind(this);
    this.viewWeekly = this.viewWeekly.bind(this);
  }

  getWeekEnds(date) {
    const dateObj = new Date(date);
    const ONEDAY = 1000 * 60 * 60 * 24;

    const sunday = new Date(dateObj.getTime() - dateObj.getDay() * ONEDAY);
    const saturday = new Date(dateObj.getTime() + ((6 - dateObj.getDay()) * ONEDAY));

    return { sunday, saturday };
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

  applyFilters() {
    const filters = {};
    filters.from = document.getElementById('date-from').value;
    filters.to = document.getElementById('date-to').value;
    filters.min = document.getElementById('min').value;
    filters.max = document.getElementById('max').value;

    if (filters.from && filters.to && filters.to < filters.from) {
      console.log('check date inputs')
    }

    else if (filters.min && filters.max && filters.max < filters.min) {
      console.log('check amount inputs')
    }

    else this.props.applyFilters(filters);
  }

  resetFilters() {
    document.getElementById('date-from').value = '';
    document.getElementById('date-to').value = '';
    document.getElementById('min').value = '';
    document.getElementById('max').value = '';

    this.props.applyFilters({
      from: '',
      to: '',
      min: '',
      max: ''
    });
  }
  render() {
    return (
      <div className='filters'>
        <div className='container-fluid'>
          <form>
            <div className='form-group'>
              <label>Dates</label>
              <input type='date' id='date-from' placeholder='from' />
              <input type='date' id='date-to' placeholder='to' />
            </div>
            <div className='form-group'>
              <label>Amounts</label>
              <input type='number' id='min' placeholder='Min' />
              <input type='number' id='max' placeholder='Max' />
            </div>
          </form>
          <button className='btn' onClick={this.applyFilters}>Apply Filters</button>
          <button className='btn' onClick={this.resetFilters}>Reset Filters</button>
          <button className='btn' onClick={this.viewWeekly}>View Weekly</button>
          <button className='btn' onClick={this.props.viewNormal}>View Normal</button>
        </div>
      </div>
    )
  }
}

const mapStateToProps = state => {
  return {
    filters: state.filters,
    selectedUser: state.selectedUser,
    userDetails: state.userDetails
  }
}

const mapDispatchToProps = dispatch => {
  return {
    applyFilters: filters => {
      dispatch(applyFilters(filters));
    },
    viewWeekly: (weeklyExpenses) => {
      dispatch(viewWeekly(weeklyExpenses));
    },
    viewNormal: () => {
      dispatch(viewNormal());
    }
  }
}

const ContainerFilters = connect(
  mapStateToProps,
  mapDispatchToProps
)(Filters);

export default ContainerFilters;