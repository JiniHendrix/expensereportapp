import React from 'react';
import { connect } from 'react-redux';
import { resetFilters, handleFilterChange } from '../actions';

class Filters extends React.PureComponent {

  render() {
    const {
      from,
      to,
      min,
      max
    } = this.props.filters;

    return (
      <div className='filters'>
        <div className='container-fluid'>
          <form>
            <div className='form-group'>
              <label>Dates</label>
              <input type='date' placeholder='from' value={from} onChange={this.props.handleChange.bind(this, 'from')} />
              <input type='date' placeholder='to' value={to} onChange={this.props.handleChange.bind(this, 'to')}/>
            </div>
            <div className='form-group'>
              <label>Amounts</label>
              <input type='number' placeholder='Min' value={min} onChange={this.props.handleChange.bind(this, 'min')}/>
              <input type='number' placeholder='Max' value={max} onChange={this.props.handleChange.bind(this, 'max')}/>
            </div>
          </form>
          <button className='btn'>Reset Filters</button>
          <button className='btn'>Get Weekly Stats</button>
        </div>
      </div>
    )
  }
}

const mapStateToProps = state => {
  return {
    filters: state.filters
  }
}

const mapDispatchToProps = dispatch => {
  return {
    resetFilters: () => {
      dispatch(resetFilters());
    },
    handleChange: (field, e) => {
      dispatch(handleFilterChange(field, e.target.value));
    }
  }
}

const ContainerFilters = connect(
  mapStateToProps,
  mapDispatchToProps
)(Filters);

export default ContainerFilters;