import React from 'react';

export default class WeeklyHeader extends React.PureComponent {

  render() {
    return (
      <div className='weekly-header'>
        <button id='left' className='btn'>{'<'}</button>
        <button id='right' className='btn'>{'>'}</button>
        <div className='inner-header'>
          <h1>Week 1999-02-13 to 1999-02-14</h1>
          <h2 className='weekly-stats'>Total: $1000</h2>
          <h2 className='weekly-stats'> Average: $200</h2>
        </div>
      </div>
    )
  }
}