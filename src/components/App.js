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
        <div class='expenses'>
          <div class='container-fluid'>
          </div>
        </div>
      </div>
    )
  }
}