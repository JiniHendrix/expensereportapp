import React from 'react';

export default class App extends React.Component {
  render() {
    return (
      <div>
        <nav>
          <ul>
            <li><a href='#'>Home</a></li>
            <li><a href='#'>New Expense</a></li>
            <li id='user'><a href='#'>Jin Choi</a></li>
          </ul>
        </nav>
        <div className='expenses'>
          <div className='expense'>
            <div className='expense-left-col'>
              <p className='expense-date'>2017-06-02 5:05 PM</p>
              <p className='expense-desc'>Bought a SSD</p>
            </div>
            <h1 className='amount'>$100</h1>
            <div className='comments'>
              <div className='comment'>This SSD is awesome</div>
              <form>
                <input type='text' placeholder='Comment...'></input>
              </form>
            </div>
          </div>
          <div className='expense'>
            <div className='expense-left-col'>
              <p className='expense-date'>2017-06-02 5:05 PM</p>
              <p className='expense-desc'>Bought a SSD</p>
            </div>
            <h1 className='amount'>$100</h1>
            <div className='comments'>
              <div className='comment'>This SSD is awesome</div>
              <form>
                <input type='text' placeholder='Comment...'></input>
              </form>
            </div>
          </div>
          <div className='expense'>
            <div className='expense-left-col'>
              <p className='expense-date'>2017-06-02 5:05 PM</p>
              <p className='expense-desc'>Bought a SSD</p>
            </div>
            <h1 className='amount'>$100</h1>
            <div className='comments'>
              <div className='comment'>This SSD is awesome</div>
              <form>
                <input type='text' placeholder='Comment...'></input>
              </form>
            </div>
          </div>
        </div>
      </div>
    )
  }
}