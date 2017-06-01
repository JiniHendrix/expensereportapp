import React from 'react';
import { connect } from 'react-redux';
import { applyFilters, viewWeekly, viewNormal } from '../actions';

class Filters extends React.PureComponent {

  constructor() {
    super();
    this.applyFilters = this.applyFilters.bind(this);
    this.resetFilters = this.resetFilters.bind(this);
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
          <button className='btn' onClick={this.props.viewWeekly}>View Weekly</button>
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