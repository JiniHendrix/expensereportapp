import React from 'react';

export default class Filters extends React.PureComponent {

  render() {
    return (
      <div className='filters'>
        <div className='container-fluid'>
          <form>
            <div className='form-group'>
              <label>Dates</label>
              <input type='date' placeholder='from'/>
              <input type='date' placeholder='to' />
            </div>
            <div className='form-group'>
              <label>Amounts</label>
              <input type='number' placeholder='Min' />
              <input type='number' placeholder='Max'/>
            </div>
          </form>
          <button className='btn'>Get Weekly Stats</button>
        </div>
      </div>
    )
  }
}