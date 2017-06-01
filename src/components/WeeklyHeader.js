import React from 'react';

export default class WeeklyHeader extends React.PureComponent {

  render() {
    const {
      prevWeek,
      nextWeek,
      weeklyExpenses: {
        total,
        average,
        saturdayDate,
        sundayDate
      }
    } = this.props;

    return (
      <div className='weekly-header'>
        <button id='left' className='btn' onClick={prevWeek}>{'<'}</button>
        <button id='right' className='btn' onClick={nextWeek}>{'>'}</button>
        <div className='inner-header'>
          <h1>Week {saturdayDate.toLocaleDateString()} to {sundayDate.toLocaleDateString()}</h1>
          <h2 className='weekly-stats'>Total: ${total.toLocaleString({currency: 'USD'})}</h2>
          <h2 className='weekly-stats'> Average: ${average.toLocaleString({currency: 'USD'})}</h2>
        </div>
      </div>
    )
  }
}